// GENERATED FILE — do not edit. Run `pnpm generate`.
//
// Source: GS1 Barcode Syntax Dictionary, release 2026-01-27
// https://github.com/gs1/gs1-syntax-dictionary/tree/2026-01-27
// Copyright (c) 2020-2021 BWIPP project; (c) 2020-2021 Zint Project;
// (c) 2021-2025 GS1 AISBL. Licensed under the Apache License, Version 2.0.
//
// Overrides applied to align with GS1 Digital Link URI Syntax 1.7.0
// (see scripts/generate-ai-table.mjs):
//   data attributes added: 7041, 8040, 8041, 8042, 8043
//   mandatory qualifiers:  (415) requires (8020)

import type { AIRangeSpec } from "../types.js";

/** Release tag of the GS1 Barcode Syntax Dictionary this table was generated from. */
export const SYNTAX_DICTIONARY_RELEASE = "2026-01-27";

/** Version of the GS1 Digital Link URI Syntax standard this library implements. */
export const URI_SYNTAX_VERSION = "1.7.0";

export const AI_RANGES: readonly AIRangeSpec[] = [
  {
    "from": "00",
    "to": "00",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 18,
        "max": 18,
        "optional": false,
        "linters": [
          "csum",
          "gcppos2"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      []
    ],
    "title": "SSCC"
  },
  {
    "from": "01",
    "to": "01",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 14,
        "max": 14,
        "optional": false,
        "linters": [
          "csum",
          "gcppos2"
        ]
      }
    ],
    "req": [],
    "ex": [
      "255",
      "37"
    ],
    "dlpkey": [
      [
        "22",
        "10",
        "21"
      ],
      [
        "235"
      ]
    ],
    "title": "GTIN"
  },
  {
    "from": "02",
    "to": "02",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 14,
        "max": 14,
        "optional": false,
        "linters": [
          "csum",
          "gcppos2"
        ]
      }
    ],
    "req": [
      [
        [
          "37"
        ]
      ]
    ],
    "ex": [
      "01",
      "03"
    ],
    "title": "CONTENT"
  },
  {
    "from": "03",
    "to": "03",
    "predefinedLength": true,
    "dataAttribute": false,
    "components": [
      {
        "cset": "N",
        "min": 14,
        "max": 14,
        "optional": false,
        "linters": [
          "csum",
          "gcppos2"
        ]
      }
    ],
    "req": [],
    "ex": [
      "01",
      "02",
      "37"
    ],
    "title": "MTO GTIN"
  },
  {
    "from": "10",
    "to": "10",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "03"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "BATCH/LOT"
  },
  {
    "from": "11",
    "to": "11",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "03"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "PROD DATE"
  },
  {
    "from": "12",
    "to": "12",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      }
    ],
    "req": [
      [
        [
          "8020"
        ]
      ]
    ],
    "ex": [],
    "title": "DUE DATE"
  },
  {
    "from": "13",
    "to": "13",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "03"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "PACK DATE"
  },
  {
    "from": "15",
    "to": "15",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "03"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "BEST BEFORE or BEST BY"
  },
  {
    "from": "16",
    "to": "16",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "03"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "SELL BY"
  },
  {
    "from": "17",
    "to": "17",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "03"
        ],
        [
          "255"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "USE BY or EXPIRY"
  },
  {
    "from": "20",
    "to": "20",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "VARIANT"
  },
  {
    "from": "21",
    "to": "21",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "03"
        ],
        [
          "8006"
        ]
      ]
    ],
    "ex": [
      "235"
    ],
    "title": "SERIAL"
  },
  {
    "from": "22",
    "to": "22",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "CPV"
  },
  {
    "from": "235",
    "to": "235",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "TPX"
  },
  {
    "from": "240",
    "to": "240",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "ADDITIONAL ID"
  },
  {
    "from": "241",
    "to": "241",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "CUST. PART No."
  },
  {
    "from": "242",
    "to": "242",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "MTO VARIANT"
  },
  {
    "from": "243",
    "to": "243",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "PCN"
  },
  {
    "from": "250",
    "to": "250",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8006"
        ]
      ],
      [
        [
          "21"
        ]
      ]
    ],
    "ex": [],
    "title": "SECONDARY SERIAL"
  },
  {
    "from": "251",
    "to": "251",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8006"
        ]
      ]
    ],
    "ex": [],
    "title": "REF. TO SOURCE"
  },
  {
    "from": "253",
    "to": "253",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 17,
        "optional": true,
        "linters": []
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      []
    ],
    "title": "GDTI"
  },
  {
    "from": "254",
    "to": "254",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "414"
        ]
      ]
    ],
    "ex": [],
    "title": "GLN EXTENSION COMPONENT"
  },
  {
    "from": "255",
    "to": "255",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      },
      {
        "cset": "N",
        "min": 1,
        "max": 12,
        "optional": true,
        "linters": []
      }
    ],
    "req": [],
    "ex": [
      "01",
      "02",
      "415",
      "8006",
      "8020",
      "8026"
    ],
    "dlpkey": [
      []
    ],
    "title": "GCN"
  },
  {
    "from": "30",
    "to": "30",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 8,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "VAR. COUNT"
  },
  {
    "from": "3100",
    "to": "3105",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "310n"
    ],
    "title": "NET WEIGHT (kg)"
  },
  {
    "from": "3110",
    "to": "3115",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "311n"
    ],
    "title": "LENGTH (m)"
  },
  {
    "from": "3120",
    "to": "3125",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "312n"
    ],
    "title": "WIDTH (m)"
  },
  {
    "from": "3130",
    "to": "3135",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "313n"
    ],
    "title": "HEIGHT (m)"
  },
  {
    "from": "3140",
    "to": "3145",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "314n"
    ],
    "title": "AREA (m²)"
  },
  {
    "from": "3150",
    "to": "3155",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "315n"
    ],
    "title": "NET VOLUME (l)"
  },
  {
    "from": "3160",
    "to": "3165",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "316n"
    ],
    "title": "NET VOLUME (m³)"
  },
  {
    "from": "3200",
    "to": "3205",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "320n"
    ],
    "title": "NET WEIGHT (lb)"
  },
  {
    "from": "3210",
    "to": "3215",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "321n"
    ],
    "title": "LENGTH (in)"
  },
  {
    "from": "3220",
    "to": "3225",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "322n"
    ],
    "title": "LENGTH (ft)"
  },
  {
    "from": "3230",
    "to": "3235",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "323n"
    ],
    "title": "LENGTH (yd)"
  },
  {
    "from": "3240",
    "to": "3245",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "324n"
    ],
    "title": "WIDTH (in)"
  },
  {
    "from": "3250",
    "to": "3255",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "325n"
    ],
    "title": "WIDTH (ft)"
  },
  {
    "from": "3260",
    "to": "3265",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "326n"
    ],
    "title": "WIDTH (yd)"
  },
  {
    "from": "3270",
    "to": "3275",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "327n"
    ],
    "title": "HEIGHT (in)"
  },
  {
    "from": "3280",
    "to": "3285",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "328n"
    ],
    "title": "HEIGHT (ft)"
  },
  {
    "from": "3290",
    "to": "3295",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "329n"
    ],
    "title": "HEIGHT (yd)"
  },
  {
    "from": "3300",
    "to": "3305",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "330n"
    ],
    "title": "GROSS WEIGHT (kg)"
  },
  {
    "from": "3310",
    "to": "3315",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "331n"
    ],
    "title": "LENGTH (m), log"
  },
  {
    "from": "3320",
    "to": "3325",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "332n"
    ],
    "title": "WIDTH (m), log"
  },
  {
    "from": "3330",
    "to": "3335",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "333n"
    ],
    "title": "HEIGHT (m), log"
  },
  {
    "from": "3340",
    "to": "3345",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "334n"
    ],
    "title": "AREA (m²), log"
  },
  {
    "from": "3350",
    "to": "3355",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "335n"
    ],
    "title": "VOLUME (l), log"
  },
  {
    "from": "3360",
    "to": "3365",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "336n"
    ],
    "title": "VOLUME (m³), log"
  },
  {
    "from": "3370",
    "to": "3375",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "337n"
    ],
    "title": "KG PER m²"
  },
  {
    "from": "3400",
    "to": "3405",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "340n"
    ],
    "title": "GROSS WEIGHT (lb)"
  },
  {
    "from": "3410",
    "to": "3415",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "341n"
    ],
    "title": "LENGTH (in), log"
  },
  {
    "from": "3420",
    "to": "3425",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "342n"
    ],
    "title": "LENGTH (ft), log"
  },
  {
    "from": "3430",
    "to": "3435",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "343n"
    ],
    "title": "LENGTH (yd), log"
  },
  {
    "from": "3440",
    "to": "3445",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "344n"
    ],
    "title": "WIDTH (in), log"
  },
  {
    "from": "3450",
    "to": "3455",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "345n"
    ],
    "title": "WIDTH (ft), log"
  },
  {
    "from": "3460",
    "to": "3465",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "346n"
    ],
    "title": "WIDTH (yd), log"
  },
  {
    "from": "3470",
    "to": "3475",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "347n"
    ],
    "title": "HEIGHT (in), log"
  },
  {
    "from": "3480",
    "to": "3485",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "348n"
    ],
    "title": "HEIGHT (ft), log"
  },
  {
    "from": "3490",
    "to": "3495",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "349n"
    ],
    "title": "HEIGHT (yd), log"
  },
  {
    "from": "3500",
    "to": "3505",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "350n"
    ],
    "title": "AREA (in²)"
  },
  {
    "from": "3510",
    "to": "3515",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "351n"
    ],
    "title": "AREA (ft²)"
  },
  {
    "from": "3520",
    "to": "3525",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "352n"
    ],
    "title": "AREA (yd²)"
  },
  {
    "from": "3530",
    "to": "3535",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "353n"
    ],
    "title": "AREA (in²), log"
  },
  {
    "from": "3540",
    "to": "3545",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "354n"
    ],
    "title": "AREA (ft²), log"
  },
  {
    "from": "3550",
    "to": "3555",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "355n"
    ],
    "title": "AREA (yd²), log"
  },
  {
    "from": "3560",
    "to": "3565",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "356n"
    ],
    "title": "NET WEIGHT (tr oz)"
  },
  {
    "from": "3570",
    "to": "3575",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "357n"
    ],
    "title": "NET VOLUME (oz)"
  },
  {
    "from": "3600",
    "to": "3605",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "360n"
    ],
    "title": "NET VOLUME (qt (US))"
  },
  {
    "from": "3610",
    "to": "3615",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "361n"
    ],
    "title": "NET VOLUME (gal.)"
  },
  {
    "from": "3620",
    "to": "3625",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "362n"
    ],
    "title": "VOLUME (qt (US)), log"
  },
  {
    "from": "3630",
    "to": "3635",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "363n"
    ],
    "title": "VOLUME (gal (US)), log"
  },
  {
    "from": "3640",
    "to": "3645",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "364n"
    ],
    "title": "NET VOLUME (in³)"
  },
  {
    "from": "3650",
    "to": "3655",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "365n"
    ],
    "title": "NET VOLUME (ft³)"
  },
  {
    "from": "3660",
    "to": "3665",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "366n"
    ],
    "title": "NET VOLUME (yd³)"
  },
  {
    "from": "3670",
    "to": "3675",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "367n"
    ],
    "title": "VOLUME (in³), log"
  },
  {
    "from": "3680",
    "to": "3685",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "368n"
    ],
    "title": "VOLUME (ft³), log"
  },
  {
    "from": "3690",
    "to": "3695",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [
      "369n"
    ],
    "title": "VOLUME (yd³), log"
  },
  {
    "from": "37",
    "to": "37",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 8,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ],
      [
        [
          "02"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "COUNT"
  },
  {
    "from": "3900",
    "to": "3909",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 15,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "255"
        ],
        [
          "8020"
        ]
      ]
    ],
    "ex": [
      "390n",
      "391n",
      "394n",
      "8111"
    ],
    "title": "AMOUNT"
  },
  {
    "from": "3910",
    "to": "3919",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso4217"
        ]
      },
      {
        "cset": "N",
        "min": 1,
        "max": 15,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "8020"
        ]
      ]
    ],
    "ex": [
      "391n"
    ],
    "title": "AMOUNT"
  },
  {
    "from": "3920",
    "to": "3929",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 15,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ],
      [
        [
          "30"
        ],
        [
          "31nn"
        ],
        [
          "32nn"
        ],
        [
          "35nn"
        ],
        [
          "36nn"
        ]
      ]
    ],
    "ex": [
      "392n",
      "393n"
    ],
    "title": "PRICE"
  },
  {
    "from": "3930",
    "to": "3939",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso4217"
        ]
      },
      {
        "cset": "N",
        "min": 1,
        "max": 15,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "30"
        ],
        [
          "31nn"
        ],
        [
          "32nn"
        ],
        [
          "35nn"
        ],
        [
          "36nn"
        ]
      ]
    ],
    "ex": [
      "393n"
    ],
    "title": "PRICE"
  },
  {
    "from": "3940",
    "to": "3943",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "255"
        ]
      ]
    ],
    "ex": [
      "394n",
      "8111"
    ],
    "title": "PRCNT OFF"
  },
  {
    "from": "3950",
    "to": "3955",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "30"
        ],
        [
          "31nn"
        ],
        [
          "32nn"
        ],
        [
          "35nn"
        ],
        [
          "36nn"
        ]
      ]
    ],
    "ex": [
      "392n",
      "393n",
      "395n",
      "8005"
    ],
    "title": "PRICE/UoM"
  },
  {
    "from": "400",
    "to": "400",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [],
    "ex": [],
    "title": "ORDER NUMBER"
  },
  {
    "from": "401",
    "to": "401",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": [
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      []
    ],
    "title": "GINC"
  },
  {
    "from": "402",
    "to": "402",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 17,
        "max": 17,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      []
    ],
    "title": "GSIN"
  },
  {
    "from": "403",
    "to": "403",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "ROUTE"
  },
  {
    "from": "410",
    "to": "410",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": "SHIP TO LOC"
  },
  {
    "from": "411",
    "to": "411",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": "BILL TO"
  },
  {
    "from": "412",
    "to": "412",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": "PURCHASE FROM"
  },
  {
    "from": "413",
    "to": "413",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": "SHIP FOR LOC"
  },
  {
    "from": "414",
    "to": "414",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      [
        "254"
      ],
      [
        "7040"
      ]
    ],
    "title": "LOC No."
  },
  {
    "from": "415",
    "to": "415",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [
      [
        [
          "8020"
        ]
      ]
    ],
    "ex": [],
    "dlpkey": [
      [
        "8020"
      ]
    ],
    "title": "PAY TO",
    "dlpkeyMandatory": [
      "8020"
    ]
  },
  {
    "from": "416",
    "to": "416",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": "PROD/SERV LOC"
  },
  {
    "from": "417",
    "to": "417",
    "predefinedLength": true,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      [
        "7040"
      ]
    ],
    "title": "PARTY"
  },
  {
    "from": "420",
    "to": "420",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [],
    "ex": [
      "421"
    ],
    "title": "SHIP TO POST"
  },
  {
    "from": "421",
    "to": "421",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 9,
        "optional": false,
        "linters": []
      }
    ],
    "req": [],
    "ex": [
      "4307"
    ],
    "title": "SHIP TO POST"
  },
  {
    "from": "422",
    "to": "422",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [
      "426"
    ],
    "title": "ORIGIN"
  },
  {
    "from": "423",
    "to": "423",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "426"
    ],
    "title": "COUNTRY - INITIAL PROCESS"
  },
  {
    "from": "424",
    "to": "424",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "426"
    ],
    "title": "COUNTRY - PROCESS"
  },
  {
    "from": "425",
    "to": "425",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": true,
        "linters": [
          "iso3166"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [
      "426"
    ],
    "title": "COUNTRY - DISASSEMBLY"
  },
  {
    "from": "426",
    "to": "426",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "COUNTRY - FULL PROCESS"
  },
  {
    "from": "427",
    "to": "427",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 3,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ],
      [
        [
          "422"
        ]
      ]
    ],
    "ex": [],
    "title": "ORIGIN SUBDIVISION"
  },
  {
    "from": "4300",
    "to": "4300",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 35,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO COMP"
  },
  {
    "from": "4301",
    "to": "4301",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 35,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO NAME"
  },
  {
    "from": "4302",
    "to": "4302",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO ADD1"
  },
  {
    "from": "4303",
    "to": "4303",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "4302"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO ADD2"
  },
  {
    "from": "4304",
    "to": "4304",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO SUB"
  },
  {
    "from": "4305",
    "to": "4305",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO LOC"
  },
  {
    "from": "4306",
    "to": "4306",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO REG"
  },
  {
    "from": "4307",
    "to": "4307",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": [
          "iso3166alpha2"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO COUNTRY"
  },
  {
    "from": "4308",
    "to": "4308",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO PHONE"
  },
  {
    "from": "4309",
    "to": "4309",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 10,
        "max": 10,
        "optional": false,
        "linters": [
          "latitude"
        ]
      },
      {
        "cset": "N",
        "min": 10,
        "max": 10,
        "optional": false,
        "linters": [
          "longitude"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SHIP TO GEO"
  },
  {
    "from": "4310",
    "to": "4310",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 35,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO COMP"
  },
  {
    "from": "4311",
    "to": "4311",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 35,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO NAME"
  },
  {
    "from": "4312",
    "to": "4312",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO ADD1"
  },
  {
    "from": "4313",
    "to": "4313",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "4312"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO ADD2"
  },
  {
    "from": "4314",
    "to": "4314",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO SUB"
  },
  {
    "from": "4315",
    "to": "4315",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO LOC"
  },
  {
    "from": "4316",
    "to": "4316",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO REG"
  },
  {
    "from": "4317",
    "to": "4317",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": [
          "iso3166alpha2"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO COUNTRY"
  },
  {
    "from": "4318",
    "to": "4318",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO POST"
  },
  {
    "from": "4319",
    "to": "4319",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "RTN TO PHONE"
  },
  {
    "from": "4320",
    "to": "4320",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 35,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SRV DESCRIPTION"
  },
  {
    "from": "4321",
    "to": "4321",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": [
          "yesno"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "DANGEROUS GOODS"
  },
  {
    "from": "4322",
    "to": "4322",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": [
          "yesno"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "AUTH TO LEAVE"
  },
  {
    "from": "4323",
    "to": "4323",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": [
          "yesno"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "SIG REQUIRED"
  },
  {
    "from": "4324",
    "to": "4324",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      },
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": [
          "hhmi"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "NOT BEF DEL DT"
  },
  {
    "from": "4325",
    "to": "4325",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmd0"
        ]
      },
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": [
          "hhmi"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "NOT AFT DEL DT"
  },
  {
    "from": "4326",
    "to": "4326",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmdd"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "REL DATE"
  },
  {
    "from": "4330",
    "to": "4330",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 1,
        "optional": true,
        "linters": [
          "hyphen"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [
      "4331"
    ],
    "title": "MAX TEMP F."
  },
  {
    "from": "4331",
    "to": "4331",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 1,
        "optional": true,
        "linters": [
          "hyphen"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [
      "4330"
    ],
    "title": "MAX TEMP C."
  },
  {
    "from": "4332",
    "to": "4332",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 1,
        "optional": true,
        "linters": [
          "hyphen"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [
      "4333"
    ],
    "title": "MIN TEMP F."
  },
  {
    "from": "4333",
    "to": "4333",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 1,
        "optional": true,
        "linters": [
          "hyphen"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [
      "4332"
    ],
    "title": "MIN TEMP C."
  },
  {
    "from": "7001",
    "to": "7001",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ],
        [
          "8006"
        ],
        [
          "8026"
        ]
      ]
    ],
    "ex": [],
    "title": "NSN"
  },
  {
    "from": "7002",
    "to": "7002",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "MEAT CUT"
  },
  {
    "from": "7003",
    "to": "7003",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmdd"
        ]
      },
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": [
          "hhmi"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "EXPIRY TIME"
  },
  {
    "from": "7004",
    "to": "7004",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 4,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01",
          "10"
        ]
      ]
    ],
    "ex": [],
    "title": "ACTIVE POTENCY"
  },
  {
    "from": "7005",
    "to": "7005",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 12,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "CATCH AREA"
  },
  {
    "from": "7006",
    "to": "7006",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmdd"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "FIRST FREEZE DATE"
  },
  {
    "from": "7007",
    "to": "7007",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmdd"
        ]
      },
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": true,
        "linters": [
          "yymmdd"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "HARVEST DATE"
  },
  {
    "from": "7008",
    "to": "7008",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 3,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "AQUATIC SPECIES"
  },
  {
    "from": "7009",
    "to": "7009",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 10,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "FISHING GEAR TYPE"
  },
  {
    "from": "7010",
    "to": "7010",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 2,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROD METHOD"
  },
  {
    "from": "7011",
    "to": "7011",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmdd"
        ]
      },
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": true,
        "linters": [
          "hhmi"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "TEST BY DATE"
  },
  {
    "from": "7020",
    "to": "7020",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8006"
        ]
      ],
      [
        [
          "416"
        ]
      ]
    ],
    "ex": [],
    "title": "REFURB LOT"
  },
  {
    "from": "7021",
    "to": "7021",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8006"
        ]
      ]
    ],
    "ex": [],
    "title": "FUNC STAT"
  },
  {
    "from": "7022",
    "to": "7022",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "7021"
        ]
      ]
    ],
    "ex": [],
    "title": "REV STAT"
  },
  {
    "from": "7023",
    "to": "7023",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": [
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": "GIAI - ASSEMBLY"
  },
  {
    "from": "7030",
    "to": "7030",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 0"
  },
  {
    "from": "7031",
    "to": "7031",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 1"
  },
  {
    "from": "7032",
    "to": "7032",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 2"
  },
  {
    "from": "7033",
    "to": "7033",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 3"
  },
  {
    "from": "7034",
    "to": "7034",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 4"
  },
  {
    "from": "7035",
    "to": "7035",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 5"
  },
  {
    "from": "7036",
    "to": "7036",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 6"
  },
  {
    "from": "7037",
    "to": "7037",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 7"
  },
  {
    "from": "7038",
    "to": "7038",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 8"
  },
  {
    "from": "7039",
    "to": "7039",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "iso3166999"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 27,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROCESSOR # 9"
  },
  {
    "from": "7040",
    "to": "7040",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": [
          "importeridx"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": "UIC+EXT"
  },
  {
    "from": "7041",
    "to": "7041",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 4,
        "optional": false,
        "linters": [
          "packagetype"
        ]
      }
    ],
    "req": [
      [
        [
          "00"
        ]
      ]
    ],
    "ex": [],
    "title": "UFRGT UNIT TYPE"
  },
  {
    "from": "710",
    "to": "710",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN PZN"
  },
  {
    "from": "711",
    "to": "711",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN CIP"
  },
  {
    "from": "712",
    "to": "712",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN CN"
  },
  {
    "from": "713",
    "to": "713",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN DRN"
  },
  {
    "from": "714",
    "to": "714",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN AIM"
  },
  {
    "from": "715",
    "to": "715",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN NDC"
  },
  {
    "from": "716",
    "to": "716",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN AIC"
  },
  {
    "from": "717",
    "to": "717",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "NHRN SRN"
  },
  {
    "from": "7230",
    "to": "7230",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 1"
  },
  {
    "from": "7231",
    "to": "7231",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 2"
  },
  {
    "from": "7232",
    "to": "7232",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 3"
  },
  {
    "from": "7233",
    "to": "7233",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 4"
  },
  {
    "from": "7234",
    "to": "7234",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 5"
  },
  {
    "from": "7235",
    "to": "7235",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 6"
  },
  {
    "from": "7236",
    "to": "7236",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 7"
  },
  {
    "from": "7237",
    "to": "7237",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 8"
  },
  {
    "from": "7238",
    "to": "7238",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 9"
  },
  {
    "from": "7239",
    "to": "7239",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": []
      },
      {
        "cset": "X",
        "min": 1,
        "max": 28,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8004"
        ]
      ]
    ],
    "ex": [],
    "title": "CERT # 10"
  },
  {
    "from": "7240",
    "to": "7240",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8006"
        ]
      ]
    ],
    "ex": [],
    "title": "PROTOCOL"
  },
  {
    "from": "7241",
    "to": "7241",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": [
          "mediatype"
        ]
      }
    ],
    "req": [
      [
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [],
    "title": "AIDC MEDIA TYPE"
  },
  {
    "from": "7242",
    "to": "7242",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 25,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [],
    "title": "VCN"
  },
  {
    "from": "7250",
    "to": "7250",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 8,
        "max": 8,
        "optional": false,
        "linters": [
          "yyyymmdd"
        ]
      }
    ],
    "req": [
      [
        [
          "8018"
        ]
      ]
    ],
    "ex": [
      "7251"
    ],
    "title": "DOB"
  },
  {
    "from": "7251",
    "to": "7251",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 8,
        "max": 8,
        "optional": false,
        "linters": [
          "yyyymmdd"
        ]
      },
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": [
          "hhmi"
        ]
      }
    ],
    "req": [
      [
        [
          "8018"
        ]
      ]
    ],
    "ex": [
      "7250"
    ],
    "title": "DOB TIME"
  },
  {
    "from": "7252",
    "to": "7252",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": [
          "iso5218"
        ]
      }
    ],
    "req": [
      [
        [
          "8018"
        ]
      ]
    ],
    "ex": [],
    "title": "BIO SEX"
  },
  {
    "from": "7253",
    "to": "7253",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 40,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [
      "7256",
      "7259"
    ],
    "title": "FAMILY NAME"
  },
  {
    "from": "7254",
    "to": "7254",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 40,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [
      "7256",
      "7259"
    ],
    "title": "GIVEN NAME"
  },
  {
    "from": "7255",
    "to": "7255",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 10,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [
      "7256",
      "7259"
    ],
    "title": "SUFFIX"
  },
  {
    "from": "7256",
    "to": "7256",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 90,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [],
    "title": "FULL NAME"
  },
  {
    "from": "7257",
    "to": "7257",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "8018"
        ]
      ]
    ],
    "ex": [],
    "title": "PERSON ADDR"
  },
  {
    "from": "7258",
    "to": "7258",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "posinseqslash"
        ]
      }
    ],
    "req": [
      [
        [
          "8018",
          "7259"
        ]
      ]
    ],
    "ex": [],
    "title": "BIRTH SEQUENCE"
  },
  {
    "from": "7259",
    "to": "7259",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 40,
        "optional": false,
        "linters": [
          "pcenc"
        ]
      }
    ],
    "req": [
      [
        [
          "8018"
        ]
      ]
    ],
    "ex": [
      "7256"
    ],
    "title": "BABY"
  },
  {
    "from": "8001",
    "to": "8001",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": [
          "nonzero"
        ]
      },
      {
        "cset": "N",
        "min": 5,
        "max": 5,
        "optional": false,
        "linters": [
          "nonzero"
        ]
      },
      {
        "cset": "N",
        "min": 3,
        "max": 3,
        "optional": false,
        "linters": [
          "nonzero"
        ]
      },
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": [
          "winding"
        ]
      },
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "DIMENSIONS"
  },
  {
    "from": "8002",
    "to": "8002",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [],
    "ex": [],
    "title": "CMT No."
  },
  {
    "from": "8003",
    "to": "8003",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 1,
        "optional": false,
        "linters": [
          "zero"
        ]
      },
      {
        "cset": "N",
        "min": 13,
        "max": 13,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      },
      {
        "cset": "X",
        "min": 1,
        "max": 16,
        "optional": true,
        "linters": []
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      []
    ],
    "title": "GRAI"
  },
  {
    "from": "8004",
    "to": "8004",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": [
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      [
        "7040"
      ]
    ],
    "title": "GIAI"
  },
  {
    "from": "8005",
    "to": "8005",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PRICE PER UNIT"
  },
  {
    "from": "8006",
    "to": "8006",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 14,
        "max": 14,
        "optional": false,
        "linters": [
          "csum",
          "gcppos2"
        ]
      },
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": [
          "pieceoftotal"
        ]
      }
    ],
    "req": [],
    "ex": [
      "01",
      "37"
    ],
    "dlpkey": [
      [
        "22",
        "10",
        "21"
      ]
    ],
    "title": "ITIP"
  },
  {
    "from": "8007",
    "to": "8007",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 34,
        "optional": false,
        "linters": [
          "iban"
        ]
      }
    ],
    "req": [
      [
        [
          "415"
        ]
      ]
    ],
    "ex": [],
    "title": "IBAN"
  },
  {
    "from": "8008",
    "to": "8008",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 6,
        "max": 6,
        "optional": false,
        "linters": [
          "yymmdd"
        ]
      },
      {
        "cset": "N",
        "min": 2,
        "max": 2,
        "optional": false,
        "linters": [
          "hh"
        ]
      },
      {
        "cset": "N",
        "min": 2,
        "max": 2,
        "optional": true,
        "linters": [
          "mi"
        ]
      },
      {
        "cset": "N",
        "min": 2,
        "max": 2,
        "optional": true,
        "linters": [
          "ss"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "02"
        ]
      ]
    ],
    "ex": [],
    "title": "PROD TIME"
  },
  {
    "from": "8009",
    "to": "8009",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 50,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "OPTSEN"
  },
  {
    "from": "8010",
    "to": "8010",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "Y",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": [
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      [
        "8011"
      ]
    ],
    "title": "CPID"
  },
  {
    "from": "8011",
    "to": "8011",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 12,
        "optional": false,
        "linters": [
          "nozeroprefix"
        ]
      }
    ],
    "req": [
      [
        [
          "8010"
        ]
      ]
    ],
    "ex": [],
    "title": "CPID SERIAL"
  },
  {
    "from": "8012",
    "to": "8012",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 20,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ],
        [
          "8006"
        ]
      ]
    ],
    "ex": [],
    "title": "VERSION"
  },
  {
    "from": "8013",
    "to": "8013",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 25,
        "optional": false,
        "linters": [
          "csumalpha",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "dlpkey": [
      []
    ],
    "title": "GMN"
  },
  {
    "from": "8014",
    "to": "8014",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 25,
        "optional": false,
        "linters": [
          "csumalpha",
          "gcppos1",
          "hasnondigit"
        ]
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "MUDI"
  },
  {
    "from": "8017",
    "to": "8017",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 18,
        "max": 18,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [
      "8018"
    ],
    "dlpkey": [
      [
        "8019"
      ]
    ],
    "title": "GSRN - PROVIDER"
  },
  {
    "from": "8018",
    "to": "8018",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 18,
        "max": 18,
        "optional": false,
        "linters": [
          "csum",
          "gcppos1"
        ]
      }
    ],
    "req": [],
    "ex": [
      "8017"
    ],
    "dlpkey": [
      [
        "8019"
      ]
    ],
    "title": "GSRN - RECIPIENT"
  },
  {
    "from": "8019",
    "to": "8019",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "N",
        "min": 1,
        "max": 10,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [],
    "title": "SRIN"
  },
  {
    "from": "8020",
    "to": "8020",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 25,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "415"
        ]
      ]
    ],
    "ex": [],
    "title": "REF No."
  },
  {
    "from": "8026",
    "to": "8026",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 14,
        "max": 14,
        "optional": false,
        "linters": [
          "csum",
          "gcppos2"
        ]
      },
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": [
          "pieceoftotal"
        ]
      }
    ],
    "req": [
      [
        [
          "37"
        ]
      ]
    ],
    "ex": [
      "02",
      "8006"
    ],
    "title": "ITIP CONTENT"
  },
  {
    "from": "8030",
    "to": "8030",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "Z",
        "min": 1,
        "max": 90,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "00"
        ],
        [
          "01",
          "21"
        ],
        [
          "253"
        ],
        [
          "255"
        ],
        [
          "8003"
        ],
        [
          "8004"
        ],
        [
          "8006",
          "21"
        ],
        [
          "8010",
          "8011"
        ],
        [
          "8017"
        ],
        [
          "8018"
        ]
      ]
    ],
    "ex": [],
    "title": "DIGSIG"
  },
  {
    "from": "8040",
    "to": "8040",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 15,
        "max": 15,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01",
          "21"
        ]
      ]
    ],
    "ex": [],
    "title": "IMEI"
  },
  {
    "from": "8041",
    "to": "8041",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 15,
        "max": 15,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01",
          "21",
          "8040"
        ]
      ]
    ],
    "ex": [],
    "title": "IMEI2"
  },
  {
    "from": "8042",
    "to": "8042",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 32,
        "max": 32,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01",
          "21",
          "8040"
        ]
      ]
    ],
    "ex": [],
    "title": "ESIM"
  },
  {
    "from": "8043",
    "to": "8043",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 18,
        "max": 18,
        "optional": false,
        "linters": []
      },
      {
        "cset": "N",
        "min": 1,
        "max": 2,
        "optional": true,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01",
          "21",
          "8040"
        ]
      ]
    ],
    "ex": [],
    "title": "PSIM"
  },
  {
    "from": "8110",
    "to": "8110",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "couponcode"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": ""
  },
  {
    "from": "8111",
    "to": "8111",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "N",
        "min": 4,
        "max": 4,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "255"
        ]
      ]
    ],
    "ex": [],
    "title": "POINTS"
  },
  {
    "from": "8112",
    "to": "8112",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": [
          "couponposoffer"
        ]
      }
    ],
    "req": [],
    "ex": [],
    "title": ""
  },
  {
    "from": "8200",
    "to": "8200",
    "predefinedLength": false,
    "dataAttribute": false,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 70,
        "optional": false,
        "linters": []
      }
    ],
    "req": [
      [
        [
          "01"
        ]
      ]
    ],
    "ex": [],
    "title": "PRODUCT URL"
  },
  {
    "from": "90",
    "to": "90",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 30,
        "optional": false,
        "linters": []
      }
    ],
    "req": [],
    "ex": [],
    "title": "INTERNAL"
  },
  {
    "from": "91",
    "to": "99",
    "predefinedLength": false,
    "dataAttribute": true,
    "components": [
      {
        "cset": "X",
        "min": 1,
        "max": 90,
        "optional": false,
        "linters": []
      }
    ],
    "req": [],
    "ex": [],
    "title": "INTERNAL"
  }
];
