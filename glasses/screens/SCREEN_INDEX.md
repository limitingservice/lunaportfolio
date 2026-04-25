# Screen Index — AR Glasses Virtual Try-On

Each screen represents a key moment in the user journey, ordered from initial product discovery through the complete AR try-on experience.

---

## Product Detail Page (PDP)

| # | File | Screen | Description |
|---|---|---|---|
| 01 | `01_Product_Page_Hero.png` | **Product Page — Initial Load** | Hero view with gallery (front angle), product info, price, color swatches, and the "Try On in AR" entry point. |
| 02 | `02_Product_Details_Expanded.png` | **Product Details — Below Fold** | Expanded view showing product description, specs list, shipping info, and CTA buttons. |
| 03 | `03_Color_Variant_Selection.png` | **Color Variant Change** | User has selected "Tortoise Shell" — gallery and info panel update to reflect the new colorway. |
| 04 | `04_3D_Angle_View.png` | **3/4 Angle View** | Angled perspective showing frame depth, temple curvature, and lens proportions. |

---

## AR Try-On Flow

| # | File | Screen | Description |
|---|---|---|---|
| 05 | `05_AR_Permission_Modal.png` | **AR Loading / Initialization** | Lazy-loaded AR module initializing with loading spinner overlay. |
| 06 | `06_AR_Virtual_TryOn_Permission.png` | **Camera Permission Request** | Pre-prompt screen with privacy assurance and camera enable CTA. |
| 07 | `07_AR_Find_Face_Guided.png` | **Guided Face Acquisition** | Snapchat-inspired face guide with oval ring, silhouette, and real-time guidance text. |
| 08 | `08_AR_Face_Locked_Confirmation.png` | **Face Found Confirmation** | 500ms success state with green ring glow and "✓ Face Found" message. |
| 09 | `09_AR_Live_TryOn_Tracking.png` | **Live AR Try-On** | Active tracking with 3D glasses overlay, color swatches, and control bar. |

---

## User Journey Map

```
[Browse Product Page] → [Explore Colors/Angles] → [Click "Try On in AR"]
         ↓                                                    ↓
   Build confidence                                    Grant camera access
   via product info                                          ↓
                                                     [Find Face Guide]
                                                          ↓
                                                  [Face Locked ✓]
                                                       ↓
                                              [Live AR Try-On]
                                                  ↓         ↓
                                          [Switch Colors] [Capture Screenshot]
                                                  ↓
                                          [Add to Bag with confidence]
```
