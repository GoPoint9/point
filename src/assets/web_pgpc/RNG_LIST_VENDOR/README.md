
## 競品有不同顏色的圖片，這邊使用資料夾區分


```js
var imgs = [
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JL-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JL-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JL-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JL-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SPB-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SPB-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SPB-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SPB-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SS-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SS-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SS-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SS-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JDB-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JDB-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JDB-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JDB-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BNG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BNG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BNG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BNG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SWG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SWG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SWG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SWG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RTG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RTG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RTG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RTG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CQ9-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CQ9-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CQ9-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CQ9-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/XGS-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/XGS-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/XGS-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/XGS-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PS-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PS-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PS-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PS-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KA-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KA-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KA-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KA-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HB-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HB-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HB-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HB-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PNG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PNG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PNG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PNG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AE-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AE-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AE-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AE-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HC-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HC-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HC-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/HC-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WD-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WD-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WD-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WD-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/VT-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/VT-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/VT-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/VT-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SW-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SW-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SW-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SW-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/GPI-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/GPI-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/GPI-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/GPI-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BB-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BB-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BB-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BB-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BOM-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BOM-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BOM-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BOM-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SAS-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SAS-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SAS-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/SAS-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JOK-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JOK-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JOK-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JOK-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/NE2-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/NE2-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/NE2-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/NE2-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MA-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MA-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MA-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MA-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KM-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KM-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KM-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/KM-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CRG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CRG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CRG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/CRG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/YL-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/YL-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/YL-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/YL-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/UPG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/UPG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/UPG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/UPG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RSG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RSG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RSG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RSG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FC-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FC-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FC-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FC-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BT-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BT-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BT-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BT-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MNC-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MNC-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MNC-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MNC-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/DRS-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/DRS-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/DRS-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/DRS-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WE-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WE-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WE-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/WE-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAS-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAS-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAS-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAS-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MW-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MW-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MW-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MW-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PSON-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PSON-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PSON-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PSON-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/R88-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/R88-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/R88-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/R88-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AMBS-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AMBS-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AMBS-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AMBS-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FTG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FTG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FTG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/FTG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BP-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BP-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BP-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/BP-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PT-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PT-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PT-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PT-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAHA-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAHA-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAHA-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/MAHA-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AW-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AW-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AW-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/AW-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RPG-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RPG-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RPG-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/RPG-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PP-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PP-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PP-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/PP-PURPLE.png"
    },
    {
        "white": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JFF-WHITE.png",
        "color": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JFF-COLOR.png",
        "rngColor": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JFF-COLOR.png",
        "purple": "https://images.11029984.com//TCG_PROD_IMAGES/RNG_LIST_VENDOR/JFF-PURPLE.png"
    }
]
```