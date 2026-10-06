import { lockScroll, unlockScroll } from "../../utils/scrollLock";
import { distanceInKm } from "../../utils/geo";

export class FlouristDeliveryModal extends HTMLElement {
    private cleanup?: () => void;

    connectedCallback() {
        this.cleanup?.();
        const deliveryDialog = this.querySelector<HTMLDialogElement>("#delivery-options");
        const deliveryClose = this.querySelector<HTMLButtonElement>(".close-delivery");
        const deliverySteps = Array.from(this.querySelectorAll<HTMLElement>("[data-delivery-step]"));
        const providerButtons = Array.from(this.querySelectorAll<HTMLButtonElement>("[data-provider]"));
        const modeButtons = Array.from(this.querySelectorAll<HTMLButtonElement>("[data-delivery-mode]"));
        const backButtons = Array.from(this.querySelectorAll<HTMLButtonElement>("[data-delivery-back]"));
        const branchLinks = Array.from(this.querySelectorAll<HTMLAnchorElement>(".delivery-branch"));
        const branchSearch = this.querySelector<HTMLInputElement>("#delivery-branch-search");
        const branchCount = this.querySelector<HTMLElement>("[data-branch-count]");
        const branchEmpty = this.querySelector<HTMLElement>("[data-branch-empty]");
        const branchList = this.querySelector<HTMLElement>("[data-branch-list]");
        const nearbyStatus = this.querySelector<HTMLElement>("[data-nearby-status]");
        const nearbySpinner = this.querySelector<HTMLElement>("[data-nearby-spinner]");
        const nearbyRetry = this.querySelector<HTMLButtonElement>("[data-nearby-retry]");
        const nearbyResult = this.querySelector<HTMLElement>("[data-nearby-result]");
        const nearbyName = this.querySelector<HTMLElement>("[data-nearby-name]");
        const nearbyDistance = this.querySelector<HTMLElement>("[data-nearby-distance]");
        const nearbyLink = this.querySelector<HTMLAnchorElement>("[data-nearby-link]");
        const nearbyToManual = this.querySelector<HTMLButtonElement>("[data-delivery-to-manual]");
        const deliveryProgress = this.querySelector<HTMLElement>("[data-delivery-progress]");
        const deliveryContext = this.querySelector<HTMLElement>("[data-delivery-context]");
        const selectedProviderName = this.querySelector<HTMLElement>("[data-selected-provider]");
        const selectedProviderLogo = this.querySelector<HTMLImageElement>("[data-selected-provider-logo]");

        if (
            !deliveryDialog ||
            !deliveryClose ||
            !branchSearch ||
            !branchCount ||
            !branchEmpty ||
            !nearbyStatus ||
            !nearbyRetry ||
            !nearbyResult ||
            !nearbyName ||
            !nearbyDistance ||
            !nearbyLink ||
            !deliveryProgress ||
            !deliveryContext ||
            !selectedProviderName
        ) {
            return;
        }

        const controller = new AbortController();
        const { signal } = controller;
        let isModalOpen = false;
        let lastDeliveryTrigger: HTMLElement | null = null;
        let selectedProvider: "lineMan" | "grab" | null = null;

        let nearbyRequestId = 0;

        const showDeliveryStep = (step: string) => {
            deliverySteps.forEach((entry) => {
                entry.hidden = entry.dataset.deliveryStep !== step;
            });
            deliveryProgress.textContent =
                step === "provider" ? "Step 1 of 3" : step === "mode" ? "Step 2 of 3" : "Step 3 of 3";
        };

        const providerUrlKey = () => (selectedProvider === "lineMan" ? "lineManUrl" : "grabUrl");

        const updateBranchLinks = () => {
            branchLinks.forEach((link) => {
                const href = selectedProvider ? link.dataset[providerUrlKey()] : "";
                link.href = href || "#";
                link.toggleAttribute("aria-disabled", !href);
            });
            nearbyLink.href = "#";
            nearbyLink.toggleAttribute("aria-disabled", true);
            nearbyLink.dataset.empty = "true";
        };

        const filterBranches = () => {
            const query = branchSearch.value.trim().toLocaleLowerCase();
            let visibleCount = 0;
            branchLinks.forEach((link) => {
                const haystack = [
                    link.dataset.storeName,
                    link.dataset.storeDistrict,
                    link.dataset.storeProvince,
                ]
                    .join(" ")
                    .toLocaleLowerCase();
                const visible = !query || haystack.includes(query);
                link.hidden = !visible;
                if (visible) visibleCount += 1;
            });
            branchEmpty.hidden = visibleCount > 0;
        };

        branchCount.textContent = `มี ${branchLinks.length} สาขาให้เลือก`;

        const resetNearbyState = () => {
            nearbyRequestId += 1;
            nearbyResult.hidden = true;
            nearbyRetry.hidden = true;
            if (nearbySpinner) nearbySpinner.hidden = true;
            nearbyStatus.textContent = "กำลังค้นหาสาขาที่ใกล้คุณจากตำแหน่งปัจจุบัน…";
            nearbyName.textContent = "";
            nearbyDistance.textContent = "";
            nearbyLink.href = "#";
            nearbyLink.setAttribute("aria-disabled", "true");
            nearbyLink.dataset.empty = "true";
        };

        const resetDelivery = () => {
            resetNearbyState();
            selectedProvider = null;
            deliveryContext.hidden = true;
            selectedProviderName.textContent = "";
            if (selectedProviderLogo) {
                selectedProviderLogo.hidden = true;
                selectedProviderLogo.src = "";
            }
            branchSearch.value = "";
            filterBranches();
            updateBranchLinks();
            if (branchList) branchList.scrollTop = 0;
            deliveryDialog.scrollTop = 0;
            showDeliveryStep("provider");
        };

        const openDelivery = (trigger?: HTMLElement | null) => {
            // Always reset completely whenever opened to prevent remembering old state
            resetDelivery();

            if (deliveryDialog.open || isModalOpen) return;
            isModalOpen = true;
            lastDeliveryTrigger = trigger || null;

            document.querySelectorAll<HTMLElement>(".delivery-trigger").forEach((el) => {
                el.setAttribute("aria-expanded", "true");
            });

            lockScroll();
            deliveryDialog.showModal();
            window.dispatchEvent(new CustomEvent("flourist:delivery-opened", { detail: { trigger } }));
        };

        const closeDelivery = () => {
            if (!deliveryDialog.open && !isModalOpen) return;
            deliveryDialog.close();
        };

        const showNearbyError = (message: string) => {
            if (nearbySpinner) nearbySpinner.hidden = true;
            nearbyResult.hidden = true;
            nearbyStatus.textContent = message;
            nearbyRetry.hidden = false;
        };

        const onGeolocationSuccess = (coords: GeolocationCoordinates, currentId: number) => {
            if (currentId !== nearbyRequestId) return;
            if (nearbySpinner) nearbySpinner.hidden = true;

            const validBranches = branchLinks
                .map((link) => {
                    const lat = parseFloat(link.dataset.storeLat || "");
                    const lng = parseFloat(link.dataset.storeLng || "");
                    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
                    const distance = distanceInKm(coords.latitude, coords.longitude, lat, lng);
                    if (!Number.isFinite(distance)) return null;
                    return { link, distance, lat, lng };
                })
                .filter((b): b is { link: HTMLAnchorElement; distance: number; lat: number; lng: number } => b !== null);

            if (validBranches.length === 0) {
                showNearbyError("ไม่พบข้อมูลพิกัดสาขา กรุณาเลือกสาขาเอง");
                return;
            }

            validBranches.sort((a, b) => a.distance - b.distance);
            const nearest = validBranches[0];

            const href = selectedProvider ? nearest.link.dataset[providerUrlKey()] : "";
            nearbyName.textContent = nearest.link.dataset.storeName || "";

            if (nearest.distance < 1) {
                const meters = Math.max(10, Math.round(nearest.distance * 1000));
                nearbyDistance.textContent = `ห่างจากตำแหน่งปัจจุบันประมาณ ${meters} เมตร`;
            } else if (nearest.distance > 80) {
                nearbyDistance.textContent = `ห่างจากตำแหน่งปัจจุบันประมาณ ${nearest.distance.toFixed(1)} กม. (สาขาทั้งหมดอยู่ในพื้นที่กรุงเทพฯ และปริมณฑล)`;
            } else {
                nearbyDistance.textContent = `ห่างจากตำแหน่งปัจจุบันประมาณ ${nearest.distance.toFixed(1)} กม.`;
            }

            nearbyLink.href = href || "#";
            nearbyLink.toggleAttribute("aria-disabled", !href);
            nearbyLink.dataset.empty = href ? "false" : "true";
            nearbyStatus.textContent = "พบสาขาที่ใกล้ที่สุดแล้ว";
            nearbyResult.hidden = false;
            nearbyRetry.hidden = true;
        };

        const findNearbyBranch = () => {
            const requestId = ++nearbyRequestId;
            nearbyResult.hidden = true;
            nearbyRetry.hidden = true;
            if (nearbySpinner) nearbySpinner.hidden = false;
            nearbyStatus.textContent = "กำลังค้นหาสาขาที่ใกล้คุณจากตำแหน่งปัจจุบัน…";
            nearbyName.textContent = "";
            nearbyDistance.textContent = "";
            nearbyLink.href = "#";
            nearbyLink.setAttribute("aria-disabled", "true");
            nearbyLink.dataset.empty = "true";

            if (!window.isSecureContext) {
                showNearbyError("การค้นหาตำแหน่งต้องเปิดเว็บไซต์ผ่าน HTTPS หรือ localhost กรุณาเลือกสาขาเอง");
                return;
            }
            if (!navigator.geolocation) {
                showNearbyError("เบราว์เซอร์นี้ไม่รองรับการค้นหาตำแหน่ง กรุณาเลือกสาขาเอง");
                return;
            }

            const handleGeoError = (error: GeolocationPositionError, isFallback = false) => {
                if (requestId !== nearbyRequestId) return;

                // If high-accuracy timed out on a desktop or indoor device, fallback seamlessly to standard accuracy
                if (error.code === 3 && !isFallback) {
                    navigator.geolocation.getCurrentPosition(
                        ({ coords }) => onGeolocationSuccess(coords, requestId),
                        (fallbackErr) => handleGeoError(fallbackErr, true),
                        { enableHighAccuracy: false, timeout: 8000, maximumAge: 0 }
                    );
                    return;
                }

                if (error.code === 1) {
                    showNearbyError("ไม่ได้รับอนุญาตให้เข้าถึงตำแหน่ง กรุณาเปิดสิทธิ์ Location ในการตั้งค่าเบราว์เซอร์หรืออุปกรณ์ แล้วลองอีกครั้ง หรือเลือกสาขาเองด้านล่าง");
                } else if (error.code === 2) {
                    showNearbyError("อุปกรณ์ไม่สามารถระบุตำแหน่งได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต แล้วลองอีกครั้ง หรือเลือกสาขาเองด้านล่าง");
                } else if (error.code === 3) {
                    showNearbyError("ค้นหาตำแหน่งไม่สำเร็จ (หมดเวลา) กรุณาลองใหม่อีกครั้ง หรือเลือกสาขาเองด้านล่าง");
                } else {
                    showNearbyError("ไม่สามารถเข้าถึงตำแหน่งได้ กรุณาลองใหม่อีกครั้ง หรือเลือกสาขาเองด้านล่าง");
                }
            };

            // Fresh query with maximumAge: 0, 8s timeout with high accuracy
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => onGeolocationSuccess(coords, requestId),
                (error) => handleGeoError(error, false),
                { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
            );
        };

        nearbyRetry.addEventListener("click", findNearbyBranch, { signal });

        if (nearbyToManual) {
            nearbyToManual.addEventListener(
                "click",
                () => {
                    resetNearbyState();
                    showDeliveryStep("manual");
                    filterBranches();
                    window.setTimeout(() => branchSearch.focus(), 0);
                },
                { signal }
            );
        }

        // Global trigger listener for any .delivery-trigger button across the page
        document.addEventListener(
            "click",
            (event) => {
                const target = event.target as HTMLElement | null;
                const trigger = target?.closest<HTMLButtonElement>(".delivery-trigger");
                if (trigger) {
                    event.preventDefault();
                    openDelivery(trigger);
                }
            },
            { signal }
        );

        // Programmatic open event listener
        window.addEventListener(
            "flourist:open-delivery",
            ((event: CustomEvent) => {
                openDelivery(event.detail?.trigger);
            }) as EventListener,
            { signal }
        );

        // Provider selection buttons
        providerButtons.forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    selectedProvider = button.dataset.provider === "lineMan" ? "lineMan" : "grab";
                    selectedProviderName.textContent = selectedProvider === "lineMan" ? "LINE MAN" : "Grab";
                    if (selectedProviderLogo) {
                        selectedProviderLogo.src = button.dataset.providerLogo || "";
                        selectedProviderLogo.hidden = false;
                    }
                    deliveryContext.hidden = false;
                    updateBranchLinks();
                    showDeliveryStep("mode");
                    window.setTimeout(() => modeButtons[0]?.focus(), 0);
                },
                { signal }
            );
        });

        // Mode selection buttons
        modeButtons.forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    const mode = button.dataset.deliveryMode;
                    if (mode === "nearby") {
                        showDeliveryStep("nearby");
                        findNearbyBranch();
                    } else {
                        showDeliveryStep("manual");
                        filterBranches();
                        window.setTimeout(() => branchSearch.focus(), 0);
                    }
                },
                { signal }
            );
        });

        // Back buttons
        backButtons.forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    const destination = button.dataset.deliveryBack || "provider";
                    if (destination === "provider") {
                        resetDelivery();
                        window.setTimeout(() => providerButtons[0]?.focus(), 0);
                    } else if (destination === "mode") {
                        resetNearbyState();
                        showDeliveryStep("mode");
                        window.setTimeout(() => modeButtons[0]?.focus(), 0);
                    } else if (destination === "manual") {
                        resetNearbyState();
                        showDeliveryStep("manual");
                        filterBranches();
                        window.setTimeout(() => branchSearch.focus(), 0);
                    } else {
                        showDeliveryStep(destination);
                    }
                },
                { signal }
            );
        });

        // Branch search input
        branchSearch.addEventListener("input", filterBranches, { signal });

        // Branch links prevention if no provider or disabled
        branchLinks.forEach((link) => {
            link.addEventListener(
                "click",
                (event) => {
                    if (!selectedProvider || link.getAttribute("href") === "#" || link.hasAttribute("aria-disabled")) {
                        event.preventDefault();
                    }
                },
                { signal }
            );
        });

        // Nearby confirmation link prevention if empty or disabled
        nearbyLink.addEventListener(
            "click",
            (event) => {
                if (nearbyLink.getAttribute("href") === "#" || nearbyLink.dataset.empty === "true" || nearbyLink.hasAttribute("aria-disabled")) {
                    event.preventDefault();
                }
            },
            { signal }
        );

        // Close button
        deliveryClose.addEventListener(
            "click",
            (event) => {
                event.stopPropagation();
                closeDelivery();
            },
            { signal }
        );

        // Dialog cancel event (e.g. Escape key)
        deliveryDialog.addEventListener(
            "cancel",
            (event) => {
                event.preventDefault();
                closeDelivery();
            },
            { signal }
        );

        // Dialog close event
        deliveryDialog.addEventListener(
            "close",
            () => {
                if (!isModalOpen) return;
                isModalOpen = false;

                document.querySelectorAll<HTMLElement>(".delivery-trigger").forEach((trigger) => {
                    trigger.setAttribute("aria-expanded", "false");
                });
                unlockScroll();
                const trigger = lastDeliveryTrigger;
                lastDeliveryTrigger = null;
                resetDelivery();
                trigger?.blur();
                window.dispatchEvent(new CustomEvent("flourist:delivery-closed"));
            },
            { signal }
        );

        // Backdrop click detection
        let deliveryBackdropPressed = false;
        deliveryDialog.addEventListener(
            "pointerdown",
            (event) => {
                deliveryBackdropPressed = event.target === deliveryDialog;
            },
            { signal }
        );

        deliveryDialog.addEventListener(
            "click",
            (event) => {
                if (deliveryBackdropPressed && event.target === deliveryDialog) {
                    event.stopPropagation();
                    closeDelivery();
                }
                deliveryBackdropPressed = false;

                // Only close modal if clicking a valid, active link that has an actual URL destination
                const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
                if (link) {
                    const href = link.getAttribute("href");
                    if (href && href !== "#" && !link.hasAttribute("aria-disabled")) {
                        closeDelivery();
                    }
                }
            },
            { signal }
        );

        // Page navigation / lifecycle cleanup
        window.addEventListener("pagehide", closeDelivery, { signal });
        document.addEventListener("astro:before-swap", closeDelivery, { signal });

        this.cleanup = () => {
            closeDelivery();
            controller.abort();
        };
    }

    disconnectedCallback() {
        this.cleanup?.();
    }
}

if (!customElements.get("flourist-delivery-modal")) {
    customElements.define("flourist-delivery-modal", FlouristDeliveryModal);
}
