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
        const nearbyStatus = this.querySelector<HTMLElement>("[data-nearby-status]");
        const nearbyRetry = this.querySelector<HTMLButtonElement>("[data-nearby-retry]");
        const nearbyResult = this.querySelector<HTMLElement>("[data-nearby-result]");
        const nearbyName = this.querySelector<HTMLElement>("[data-nearby-name]");
        const nearbyDistance = this.querySelector<HTMLElement>("[data-nearby-distance]");
        const nearbyLink = this.querySelector<HTMLAnchorElement>("[data-nearby-link]");
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

        const openDelivery = (trigger?: HTMLElement | null) => {
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

        const showNearbyError = (message: string) => {
            nearbyResult.hidden = true;
            nearbyStatus.textContent = message;
            nearbyRetry.hidden = false;
        };

        const findNearbyBranch = () => {
            const requestId = ++nearbyRequestId;
            nearbyResult.hidden = true;
            nearbyRetry.hidden = true;
            nearbyStatus.textContent = "กำลังค้นหาสาขาที่ใกล้คุณจากตำแหน่งปัจจุบัน…";
            if (!window.isSecureContext) {
                showNearbyError("การค้นหาตำแหน่งต้องเปิดเว็บไซต์ผ่าน HTTPS หรือ localhost กรุณาเลือกสาขาเอง");
                return;
            }
            if (!navigator.geolocation) {
                showNearbyError("เบราว์เซอร์นี้ไม่รองรับการค้นหาตำแหน่ง กรุณาเลือกสาขาเอง");
                return;
            }
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    if (requestId !== nearbyRequestId) return;
                    const nearest = branchLinks
                        .map((link) => ({
                            link,
                            distance: distanceInKm(
                                coords.latitude,
                                coords.longitude,
                                Number(link.dataset.storeLat),
                                Number(link.dataset.storeLng)
                            ),
                        }))
                        .sort((a, b) => a.distance - b.distance)[0];

                    if (!nearest) {
                        showNearbyError("ยังไม่มีข้อมูลสาขา กรุณาเลือกสาขาเอง");
                        return;
                    }
                    const href = selectedProvider ? nearest.link.dataset[providerUrlKey()] : "";
                    nearbyName.textContent = nearest.link.dataset.storeName || "";
                    nearbyDistance.textContent = `ห่างจากตำแหน่งปัจจุบันประมาณ ${nearest.distance.toFixed(1)} กม.`;
                    nearbyLink.href = href || "#";
                    nearbyLink.toggleAttribute("aria-disabled", !href);
                    nearbyLink.dataset.empty = href ? "false" : "true";
                    nearbyStatus.textContent = "พบสาขาที่ใกล้ที่สุดแล้ว";
                    nearbyResult.hidden = false;
                },
                (error) => {
                    if (requestId !== nearbyRequestId) return;
                    if (error.code === 1) {
                        showNearbyError("ไม่ได้รับอนุญาตให้ใช้ตำแหน่ง กรุณาตรวจสิทธิ์ของเว็บไซต์ในเบราว์เซอร์ และ Location Services ของเบราว์เซอร์ในเครื่อง Mac แล้วลองอีกครั้ง หรือเลือกสาขาเอง");
                    } else if (error.code === 2) {
                        showNearbyError("เครื่องไม่สามารถระบุตำแหน่งได้ กรุณาตรวจอินเทอร์เน็ตและ Location Services แล้วลองอีกครั้ง หรือเลือกสาขาเอง");
                    } else if (error.code === 3) {
                        showNearbyError("ค้นหาตำแหน่งไม่ทันเวลา กรุณาลองอีกครั้ง หรือเลือกสาขาเอง");
                    } else {
                        showNearbyError("ไม่สามารถเข้าถึงตำแหน่งได้ กรุณาลองอีกครั้ง หรือเลือกสาขาเอง");
                    }
                },

                { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
            );
        };

        nearbyRetry.addEventListener("click", findNearbyBranch, { signal });

        const resetDelivery = () => {
            nearbyRequestId += 1;
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
            nearbyResult.hidden = true;
            nearbyRetry.hidden = true;
            nearbyStatus.textContent = "กำลังค้นหาสาขาที่ใกล้คุณจากตำแหน่งปัจจุบัน…";
            showDeliveryStep("provider");
        };

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
                        selectedProvider = null;
                        deliveryContext.hidden = true;
                        selectedProviderName.textContent = "";
                        if (selectedProviderLogo) {
                            selectedProviderLogo.hidden = true;
                            selectedProviderLogo.src = "";
                        }
                        updateBranchLinks();
                    }
                    showDeliveryStep(destination);
                    if (destination === "provider") window.setTimeout(() => providerButtons[0]?.focus(), 0);
                },
                { signal }
            );
        });

        // Branch search input
        branchSearch.addEventListener("input", filterBranches, { signal });

        // Branch links prevention if no provider
        branchLinks.forEach((link) => {
            link.addEventListener(
                "click",
                (event) => {
                    if (!selectedProvider || link.getAttribute("href") === "#") event.preventDefault();
                },
                { signal }
            );
        });

        // Nearby confirmation link prevention if empty
        nearbyLink.addEventListener(
            "click",
            (event) => {
                if (nearbyLink.getAttribute("href") === "#" || nearbyLink.dataset.empty === "true") {
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
                if (event.target instanceof Element && event.target.closest("a[href]")) closeDelivery();
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
