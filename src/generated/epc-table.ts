// GENERATED FILE — do not edit. Run `pnpm generate`.
//
// Source: GS1 EPC Tag Data Translation (TDT) 2.2 artefacts, 2024-11-18
// https://github.com/gs1/TDT/tree/main/artefacts/JSON
// (c) GS1 AISBL. Licensed under the Apache License, Version 2.0.

import type { EpcScheme, TableFComponent } from "../epc-types.js";

/** Version of the GS1 EPC Tag Data Translation artefacts these tables were generated from. */
export const TDT_VERSION = "2.2";

/** EPC schemes that have a GS1 Digital Link form, keyed by their 8-bit header. */
export const EPC_SCHEMES: readonly EpcScheme[] = [
  {
    "name": "SGTIN+",
    "header": "11110111",
    "options": [
      {
        "key": "1",
        "pattern": "^11110111([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "DSGTIN+",
    "header": "11111011",
    "options": [
      {
        "key": "0",
        "pattern": "^11111011([01])([01]{3})0000([01]{16})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          },
          {
            "name": "prodDate",
            "kind": "date"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial",
          "'?11='",
          "prodDate"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      },
      {
        "key": "1",
        "pattern": "^11111011([01])([01]{3})0001([01]{16})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          },
          {
            "name": "packDate",
            "kind": "date"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial",
          "'?13='",
          "packDate"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      },
      {
        "key": "2",
        "pattern": "^11111011([01])([01]{3})0010([01]{16})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          },
          {
            "name": "bestBeforeDate",
            "kind": "date"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial",
          "'?15='",
          "bestBeforeDate"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      },
      {
        "key": "3",
        "pattern": "^11111011([01])([01]{3})0011([01]{16})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          },
          {
            "name": "sellByDate",
            "kind": "date"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial",
          "'?16='",
          "sellByDate"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      },
      {
        "key": "4",
        "pattern": "^11111011([01])([01]{3})0100([01]{16})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          },
          {
            "name": "expDate",
            "kind": "date"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial",
          "'?17='",
          "expDate"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      },
      {
        "key": "5",
        "pattern": "^11111011([01])([01]{3})0101([01]{16})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          },
          {
            "name": "firstFreezeDate",
            "kind": "date"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial",
          "'?7006='",
          "firstFreezeDate"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      },
      {
        "key": "6",
        "pattern": "^11111011([01])([01]{3})0110([01]{16})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          },
          {
            "name": "harvestDate",
            "kind": "date"
          }
        ],
        "grammar": [
          "'/01/'",
          "gtin",
          "'/21/'",
          "urlEscapedSerial",
          "'?7007='",
          "harvestDate"
        ],
        "encodedAI": [
          {
            "ai": "01",
            "name": "gtin"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "ITIP+",
    "header": "11110011",
    "options": [
      {
        "key": "1",
        "pattern": "^11110011([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/8006/'",
          "itip",
          "'/21/'",
          "urlEscapedSerial"
        ],
        "encodedAI": [
          {
            "ai": "8006",
            "name": "itip"
          },
          {
            "ai": "21",
            "name": "serial"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "SSCC+",
    "header": "11111001",
    "options": [
      {
        "key": "1",
        "pattern": "^11111001([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/00/'",
          "sscc"
        ],
        "encodedAI": [
          {
            "ai": "00",
            "name": "sscc"
          }
        ]
      }
    ],
    "extract": [],
    "format": []
  },
  {
    "name": "SGLN+",
    "header": "11110010",
    "options": [
      {
        "key": "1",
        "pattern": "^11110010([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/414/'",
          "gln",
          "'/254/'",
          "urlEscapedSerial"
        ],
        "encodedAI": [
          {
            "ai": "414",
            "name": "gln"
          },
          {
            "ai": "254",
            "name": "serial"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "GRAI+",
    "header": "11110001",
    "options": [
      {
        "key": "1",
        "pattern": "^11110001([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/8003/'",
          "urlEscapedValueOf8003"
        ],
        "encodedAI": [
          {
            "ai": "8003",
            "name": "valueOf8003"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedValueOf8003",
        "fn": "URLENCODE",
        "args": [
          "valueOf8003"
        ]
      }
    ]
  },
  {
    "name": "GIAI+",
    "header": "11111010",
    "options": [
      {
        "key": "1",
        "pattern": "^11111010([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/8004/'",
          "urlEscapedGiai"
        ],
        "encodedAI": [
          {
            "ai": "8004",
            "name": "giai"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedGiai",
        "fn": "URLENCODE",
        "args": [
          "giai"
        ]
      }
    ]
  },
  {
    "name": "GDTI+",
    "header": "11110110",
    "options": [
      {
        "key": "1",
        "pattern": "^11110110([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/253/'",
          "urlEscapedGdti"
        ],
        "encodedAI": [
          {
            "ai": "253",
            "name": "gdti"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedGdti",
        "fn": "URLENCODE",
        "args": [
          "gdti"
        ]
      }
    ]
  },
  {
    "name": "GSRN+",
    "header": "11110100",
    "options": [
      {
        "key": "1",
        "pattern": "^11110100([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/8018/'",
          "gsrn"
        ],
        "encodedAI": [
          {
            "ai": "8018",
            "name": "gsrn"
          }
        ]
      }
    ],
    "extract": [],
    "format": []
  },
  {
    "name": "GSRNP+",
    "header": "11110101",
    "options": [
      {
        "key": "1",
        "pattern": "^11110101([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/8017/'",
          "gsrnp"
        ],
        "encodedAI": [
          {
            "ai": "8017",
            "name": "gsrnp"
          }
        ]
      }
    ],
    "extract": [],
    "format": []
  },
  {
    "name": "SGCN+",
    "header": "11111000",
    "options": [
      {
        "key": "1",
        "pattern": "^11111000([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/255/'",
          "gcn"
        ],
        "encodedAI": [
          {
            "ai": "255",
            "name": "gcn"
          }
        ]
      }
    ],
    "extract": [],
    "format": []
  },
  {
    "name": "CPI+",
    "header": "11110000",
    "options": [
      {
        "key": "1",
        "pattern": "^11110000([01])([01]{3})",
        "fields": [
          {
            "name": "dataToggle",
            "kind": "int",
            "min": "0",
            "max": "1"
          },
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7"
          }
        ],
        "grammar": [
          "'/8010/'",
          "urlEncodedCpi",
          "'/8011/'",
          "serial"
        ],
        "encodedAI": [
          {
            "ai": "8010",
            "name": "cpi"
          },
          {
            "ai": "8011",
            "name": "serial"
          }
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEncodedCpi",
        "fn": "URLENCODE",
        "args": [
          "cpi"
        ]
      }
    ]
  },
  {
    "name": "SGTIN-96",
    "header": "00110000",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00110000([01]{3})000([01]{40})([01]{4})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00110000([01]{3})001([01]{37})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00110000([01]{3})010([01]{34})([01]{10})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00110000([01]{3})011([01]{30})([01]{14})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00110000([01]{3})100([01]{27})([01]{17})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00110000([01]{3})101([01]{24})([01]{20})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00110000([01]{3})110([01]{20})([01]{24})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "serial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "indicatordigit",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "0",
          "1"
        ]
      },
      {
        "out": "itemrefremainder",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "1"
        ]
      },
      {
        "out": "gtinprefix",
        "fn": "CONCAT",
        "args": [
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gtinprefix"
        ]
      }
    ]
  },
  {
    "name": "SGTIN-198",
    "header": "00110110",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00110110([01]{3})000([01]{40})([01]{4})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00110110([01]{3})001([01]{37})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00110110([01]{3})010([01]{34})([01]{10})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00110110([01]{3})011([01]{30})([01]{14})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00110110([01]{3})100([01]{27})([01]{17})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00110110([01]{3})101([01]{24})([01]{20})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00110110([01]{3})110([01]{20})([01]{24})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/01/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "'/21/'",
          "urlEscapedSerial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "indicatordigit",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "0",
          "1"
        ]
      },
      {
        "out": "itemrefremainder",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "1"
        ]
      },
      {
        "out": "gtinprefix",
        "fn": "CONCAT",
        "args": [
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gtinprefix"
        ]
      },
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "ITIP-110",
    "header": "01000000",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^01000000([01]{3})000([01]{40})([01]{4})([01]{7})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "11",
        "pattern": "^01000000([01]{3})001([01]{37})([01]{7})([01]{7})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "10",
        "pattern": "^01000000([01]{3})010([01]{34})([01]{10})([01]{7})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "9",
        "pattern": "^01000000([01]{3})011([01]{30})([01]{14})([01]{7})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "8",
        "pattern": "^01000000([01]{3})100([01]{27})([01]{17})([01]{7})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "7",
        "pattern": "^01000000([01]{3})101([01]{24})([01]{20})([01]{7})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "serial"
        ]
      },
      {
        "key": "6",
        "pattern": "^01000000([01]{3})110([01]{20})([01]{24})([01]{7})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "serial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "indicatordigit",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "0",
          "1"
        ]
      },
      {
        "out": "itemrefremainder",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "1"
        ]
      },
      {
        "out": "gtinprefix",
        "fn": "CONCAT",
        "args": [
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gtinprefix"
        ]
      }
    ]
  },
  {
    "name": "ITIP-212",
    "header": "01000001",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^01000001([01]{3})000([01]{40})([01]{4})([01]{7})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "11",
        "pattern": "^01000001([01]{3})001([01]{37})([01]{7})([01]{7})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "10",
        "pattern": "^01000001([01]{3})010([01]{34})([01]{10})([01]{7})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "9",
        "pattern": "^01000001([01]{3})011([01]{30})([01]{14})([01]{7})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "8",
        "pattern": "^01000001([01]{3})100([01]{27})([01]{17})([01]{7})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "7",
        "pattern": "^01000001([01]{3})101([01]{24})([01]{20})([01]{7})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "6",
        "pattern": "^01000001([01]{3})110([01]{20})([01]{24})([01]{7})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "itemref",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "piece",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "total",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8006/'",
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder",
          "checkdigit",
          "piece",
          "total",
          "'/21/'",
          "urlEscapedSerial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "indicatordigit",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "0",
          "1"
        ]
      },
      {
        "out": "itemrefremainder",
        "fn": "SUBSTR",
        "args": [
          "itemref",
          "1"
        ]
      },
      {
        "out": "gtinprefix",
        "fn": "CONCAT",
        "args": [
          "indicatordigit",
          "gs1companyprefix",
          "itemrefremainder"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gtinprefix"
        ]
      },
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "SSCC-96",
    "header": "00110001",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00110001([01]{3})000([01]{40})([01]{18})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "serialref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          }
        ],
        "grammar": [
          "'/00/'",
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder",
          "checkdigit"
        ]
      },
      {
        "key": "11",
        "pattern": "^00110001([01]{3})001([01]{37})([01]{21})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "serialref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          }
        ],
        "grammar": [
          "'/00/'",
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder",
          "checkdigit"
        ]
      },
      {
        "key": "10",
        "pattern": "^00110001([01]{3})010([01]{34})([01]{24})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "serialref",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          }
        ],
        "grammar": [
          "'/00/'",
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder",
          "checkdigit"
        ]
      },
      {
        "key": "9",
        "pattern": "^00110001([01]{3})011([01]{30})([01]{28})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "serialref",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          }
        ],
        "grammar": [
          "'/00/'",
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder",
          "checkdigit"
        ]
      },
      {
        "key": "8",
        "pattern": "^00110001([01]{3})100([01]{27})([01]{31})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "serialref",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          }
        ],
        "grammar": [
          "'/00/'",
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder",
          "checkdigit"
        ]
      },
      {
        "key": "7",
        "pattern": "^00110001([01]{3})101([01]{24})([01]{34})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "serialref",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          }
        ],
        "grammar": [
          "'/00/'",
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder",
          "checkdigit"
        ]
      },
      {
        "key": "6",
        "pattern": "^00110001([01]{3})110([01]{20})([01]{38})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serialref",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          }
        ],
        "grammar": [
          "'/00/'",
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder",
          "checkdigit"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "extensiondigit",
        "fn": "SUBSTR",
        "args": [
          "serialref",
          "0",
          "1"
        ]
      },
      {
        "out": "serialrefremainder",
        "fn": "SUBSTR",
        "args": [
          "serialref",
          "1"
        ]
      },
      {
        "out": "ssccprefix",
        "fn": "CONCAT",
        "args": [
          "extensiondigit",
          "gs1companyprefix",
          "serialrefremainder"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "ssccprefix"
        ]
      }
    ]
  },
  {
    "name": "SGLN-96",
    "header": "00110010",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00110010([01]{3})000([01]{40})([01]{1})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "serial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00110010([01]{3})001([01]{37})([01]{4})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "serial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00110010([01]{3})010([01]{34})([01]{7})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "serial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00110010([01]{3})011([01]{30})([01]{11})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "serial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00110010([01]{3})100([01]{27})([01]{14})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "serial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00110010([01]{3})101([01]{24})([01]{17})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "serial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00110010([01]{3})110([01]{20})([01]{21})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "serial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "glnprefix",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "locationref"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "glnprefix"
        ]
      }
    ]
  },
  {
    "name": "SGLN-195",
    "header": "00111001",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00111001([01]{3})000([01]{40})([01]{1})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00111001([01]{3})001([01]{37})([01]{4})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00111001([01]{3})010([01]{34})([01]{7})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00111001([01]{3})011([01]{30})([01]{11})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00111001([01]{3})100([01]{27})([01]{14})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00111001([01]{3})101([01]{24})([01]{17})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00111001([01]{3})110([01]{20})([01]{21})([01]{140})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "locationref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/414/'",
          "gs1companyprefix",
          "locationref",
          "checkdigit",
          "'/254/'",
          "urlEscapedSerial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "glnprefix",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "locationref"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "glnprefix"
        ]
      },
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "GRAI-96",
    "header": "00110011",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00110011([01]{3})000([01]{40})([01]{4})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00110011([01]{3})001([01]{37})([01]{7})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00110011([01]{3})010([01]{34})([01]{10})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00110011([01]{3})011([01]{30})([01]{14})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00110011([01]{3})100([01]{27})([01]{17})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00110011([01]{3})101([01]{24})([01]{20})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00110011([01]{3})110([01]{20})([01]{24})([01]{38})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "274877906943"
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "serial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "graiprefix",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "assettype"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "graiprefix"
        ]
      }
    ]
  },
  {
    "name": "GRAI-170",
    "header": "00110111",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00110111([01]{3})000([01]{40})([01]{4})([01]{112})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00110111([01]{3})001([01]{37})([01]{7})([01]{112})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00110111([01]{3})010([01]{34})([01]{10})([01]{112})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00110111([01]{3})011([01]{30})([01]{14})([01]{112})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00110111([01]{3})100([01]{27})([01]{17})([01]{112})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00110111([01]{3})101([01]{24})([01]{20})([01]{112})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00110111([01]{3})110([01]{20})([01]{24})([01]{112})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "assettype",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8003/'",
          "'0'",
          "gs1companyprefix",
          "assettype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "graiprefix",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "assettype"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "graiprefix"
        ]
      },
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "GIAI-96",
    "header": "00110100",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00110100([01]{3})000([01]{40})([01]{42})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "indassetref",
            "kind": "int",
            "min": "0",
            "max": "4398046511103"
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "indassetref"
        ]
      },
      {
        "key": "11",
        "pattern": "^00110100([01]{3})001([01]{37})([01]{45})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "indassetref",
            "kind": "int",
            "min": "0",
            "max": "35184372088831"
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "indassetref"
        ]
      },
      {
        "key": "10",
        "pattern": "^00110100([01]{3})010([01]{34})([01]{48})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "indassetref",
            "kind": "int",
            "min": "0",
            "max": "281474976710655"
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "indassetref"
        ]
      },
      {
        "key": "9",
        "pattern": "^00110100([01]{3})011([01]{30})([01]{52})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "indassetref",
            "kind": "int",
            "min": "0",
            "max": "4503599627370495"
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "indassetref"
        ]
      },
      {
        "key": "8",
        "pattern": "^00110100([01]{3})100([01]{27})([01]{55})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "indassetref",
            "kind": "int",
            "min": "0",
            "max": "36028797018963967"
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "indassetref"
        ]
      },
      {
        "key": "7",
        "pattern": "^00110100([01]{3})101([01]{24})([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "indassetref",
            "kind": "int",
            "min": "0",
            "max": "288230376151711743"
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "indassetref"
        ]
      },
      {
        "key": "6",
        "pattern": "^00110100([01]{3})110([01]{20})([01]{62})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "indassetref",
            "kind": "int",
            "min": "0",
            "max": "4611686018427387903"
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "indassetref"
        ]
      }
    ],
    "extract": [],
    "format": []
  },
  {
    "name": "GIAI-202",
    "header": "00111000",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00111000([01]{3})000([01]{40})([01]{148})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "indassetref",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "urlEscapedIndAssetRef"
        ]
      },
      {
        "key": "11",
        "pattern": "^00111000([01]{3})001([01]{37})([01]{151})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "indassetref",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "urlEscapedIndAssetRef"
        ]
      },
      {
        "key": "10",
        "pattern": "^00111000([01]{3})010([01]{34})([01]{154})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "indassetref",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "urlEscapedIndAssetRef"
        ]
      },
      {
        "key": "9",
        "pattern": "^00111000([01]{3})011([01]{30})([01]{158})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "indassetref",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "urlEscapedIndAssetRef"
        ]
      },
      {
        "key": "8",
        "pattern": "^00111000([01]{3})100([01]{27})([01]{161})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "indassetref",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "urlEscapedIndAssetRef"
        ]
      },
      {
        "key": "7",
        "pattern": "^00111000([01]{3})101([01]{24})([01]{164})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "indassetref",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "urlEscapedIndAssetRef"
        ]
      },
      {
        "key": "6",
        "pattern": "^00111000([01]{3})110([01]{20})([01]{168})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "indassetref",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/8004/'",
          "gs1companyprefix",
          "urlEscapedIndAssetRef"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEscapedIndAssetRef",
        "fn": "URLENCODE",
        "args": [
          "indassetref"
        ]
      }
    ]
  },
  {
    "name": "GDTI-96",
    "header": "00101100",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00101100([01]{3})000([01]{40})(0)([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00101100([01]{3})001([01]{37})([01]{4})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00101100([01]{3})010([01]{34})([01]{7})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00101100([01]{3})011([01]{30})([01]{11})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00101100([01]{3})100([01]{27})([01]{14})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00101100([01]{3})101([01]{24})([01]{17})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00101100([01]{3})110([01]{20})([01]{21})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "2199023255551"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "gdtibody",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "doctype"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gdtibody"
        ]
      }
    ]
  },
  {
    "name": "GDTI-113",
    "header": "00111010",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00111010([01]{3})000([01]{40})(0)([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "99999999999999999"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00111010([01]{3})001([01]{37})([01]{4})([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "99999999999999999"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00111010([01]{3})010([01]{34})([01]{7})([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "99999999999999999"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00111010([01]{3})011([01]{30})([01]{11})([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "99999999999999999"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00111010([01]{3})100([01]{27})([01]{14})([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "99999999999999999"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00111010([01]{3})101([01]{24})([01]{17})([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "99999999999999999"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00111010([01]{3})110([01]{20})([01]{21})([01]{58})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "int",
            "min": "0",
            "max": "99999999999999999"
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "serial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "gdtibody",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "doctype"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gdtibody"
        ]
      }
    ]
  },
  {
    "name": "GDTI-174",
    "header": "00111110",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00111110([01]{3})000([01]{40})(0)([01]{119})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00111110([01]{3})001([01]{37})([01]{4})([01]{119})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00111110([01]{3})010([01]{34})([01]{7})([01]{119})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00111110([01]{3})011([01]{30})([01]{11})([01]{119})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00111110([01]{3})100([01]{27})([01]{14})([01]{119})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00111110([01]{3})101([01]{24})([01]{17})([01]{119})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00111110([01]{3})110([01]{20})([01]{21})([01]{119})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "doctype",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serial",
            "kind": "chars",
            "chars": 7
          }
        ],
        "grammar": [
          "'/253/'",
          "gs1companyprefix",
          "doctype",
          "checkdigit",
          "urlEscapedSerial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "gdtibody",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "doctype"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gdtibody"
        ]
      },
      {
        "out": "urlEscapedSerial",
        "fn": "URLENCODE",
        "args": [
          "serial"
        ]
      }
    ]
  },
  {
    "name": "GSRN-96",
    "header": "00101101",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00101101([01]{3})000([01]{40})([01]{18})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          }
        ],
        "grammar": [
          "'/8018/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "11",
        "pattern": "^00101101([01]{3})001([01]{37})([01]{21})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          }
        ],
        "grammar": [
          "'/8018/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "10",
        "pattern": "^00101101([01]{3})010([01]{34})([01]{24})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          }
        ],
        "grammar": [
          "'/8018/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "9",
        "pattern": "^00101101([01]{3})011([01]{30})([01]{28})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          }
        ],
        "grammar": [
          "'/8018/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "8",
        "pattern": "^00101101([01]{3})100([01]{27})([01]{31})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          }
        ],
        "grammar": [
          "'/8018/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "7",
        "pattern": "^00101101([01]{3})101([01]{24})([01]{34})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          }
        ],
        "grammar": [
          "'/8018/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "6",
        "pattern": "^00101101([01]{3})110([01]{20})([01]{38})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          }
        ],
        "grammar": [
          "'/8018/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "gsrnprefix",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "serviceref"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gsrnprefix"
        ]
      }
    ]
  },
  {
    "name": "GSRNP-96",
    "header": "00101110",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00101110([01]{3})000([01]{40})([01]{18})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          }
        ],
        "grammar": [
          "'/8017/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "11",
        "pattern": "^00101110([01]{3})001([01]{37})([01]{21})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          }
        ],
        "grammar": [
          "'/8017/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "10",
        "pattern": "^00101110([01]{3})010([01]{34})([01]{24})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          }
        ],
        "grammar": [
          "'/8017/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "9",
        "pattern": "^00101110([01]{3})011([01]{30})([01]{28})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          }
        ],
        "grammar": [
          "'/8017/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "8",
        "pattern": "^00101110([01]{3})100([01]{27})([01]{31})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          }
        ],
        "grammar": [
          "'/8017/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "7",
        "pattern": "^00101110([01]{3})101([01]{24})([01]{34})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          }
        ],
        "grammar": [
          "'/8017/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      },
      {
        "key": "6",
        "pattern": "^00101110([01]{3})110([01]{20})([01]{38})000000000000000000000000",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "serviceref",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          }
        ],
        "grammar": [
          "'/8017/'",
          "gs1companyprefix",
          "serviceref",
          "checkdigit"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "gsrnpprefix",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "serviceref"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "gsrnpprefix"
        ]
      }
    ]
  },
  {
    "name": "SGCN-96",
    "header": "00111111",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00111111([01]{3})000([01]{40})(0)([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "couponref",
            "kind": "int",
            "min": "0",
            "max": "0",
            "length": 0
          },
          {
            "name": "prependedserial",
            "kind": "int",
            "min": "10",
            "max": "1999999999999"
          }
        ],
        "grammar": [
          "'/255/'",
          "gs1companyprefix",
          "couponref",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00111111([01]{3})001([01]{37})([01]{4})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "couponref",
            "kind": "int",
            "min": "0",
            "max": "9",
            "length": 1
          },
          {
            "name": "prependedserial",
            "kind": "int",
            "min": "10",
            "max": "1999999999999"
          }
        ],
        "grammar": [
          "'/255/'",
          "gs1companyprefix",
          "couponref",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00111111([01]{3})010([01]{34})([01]{7})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "couponref",
            "kind": "int",
            "min": "0",
            "max": "99",
            "length": 2
          },
          {
            "name": "prependedserial",
            "kind": "int",
            "min": "10",
            "max": "1999999999999"
          }
        ],
        "grammar": [
          "'/255/'",
          "gs1companyprefix",
          "couponref",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00111111([01]{3})011([01]{30})([01]{11})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "couponref",
            "kind": "int",
            "min": "0",
            "max": "999",
            "length": 3
          },
          {
            "name": "prependedserial",
            "kind": "int",
            "min": "10",
            "max": "1999999999999"
          }
        ],
        "grammar": [
          "'/255/'",
          "gs1companyprefix",
          "couponref",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00111111([01]{3})100([01]{27})([01]{14})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "couponref",
            "kind": "int",
            "min": "0",
            "max": "9999",
            "length": 4
          },
          {
            "name": "prependedserial",
            "kind": "int",
            "min": "10",
            "max": "1999999999999"
          }
        ],
        "grammar": [
          "'/255/'",
          "gs1companyprefix",
          "couponref",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00111111([01]{3})101([01]{24})([01]{17})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "couponref",
            "kind": "int",
            "min": "0",
            "max": "99999",
            "length": 5
          },
          {
            "name": "prependedserial",
            "kind": "int",
            "min": "10",
            "max": "1999999999999"
          }
        ],
        "grammar": [
          "'/255/'",
          "gs1companyprefix",
          "couponref",
          "checkdigit",
          "serial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00111111([01]{3})110([01]{20})([01]{21})([01]{41})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "couponref",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "prependedserial",
            "kind": "int",
            "min": "10",
            "max": "1999999999999"
          }
        ],
        "grammar": [
          "'/255/'",
          "gs1companyprefix",
          "couponref",
          "checkdigit",
          "serial"
        ]
      }
    ],
    "extract": [
      {
        "out": "serial",
        "fn": "SUBSTR",
        "args": [
          "prependedserial",
          "1"
        ]
      }
    ],
    "format": [
      {
        "out": "sgcnbody",
        "fn": "CONCAT",
        "args": [
          "gs1companyprefix",
          "couponref"
        ]
      },
      {
        "out": "checkdigit",
        "fn": "GS1CHECKSUM",
        "args": [
          "sgcnbody"
        ]
      }
    ]
  },
  {
    "name": "CPI-96",
    "header": "00111100",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00111100([01]{3})000([01]{40})([01]{11})([01]{31})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "comppartref",
            "kind": "int",
            "min": "0",
            "max": "999"
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "2147483647"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "comppartref",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00111100([01]{3})001([01]{37})([01]{14})([01]{31})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "comppartref",
            "kind": "int",
            "min": "0",
            "max": "9999"
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "2147483647"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "comppartref",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00111100([01]{3})010([01]{34})([01]{17})([01]{31})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "comppartref",
            "kind": "int",
            "min": "0",
            "max": "99999"
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "2147483647"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "comppartref",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00111100([01]{3})011([01]{30})([01]{21})([01]{31})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "comppartref",
            "kind": "int",
            "min": "0",
            "max": "999999"
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "2147483647"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "comppartref",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00111100([01]{3})100([01]{27})([01]{24})([01]{31})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "comppartref",
            "kind": "int",
            "min": "0",
            "max": "9999999"
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "2147483647"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "comppartref",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00111100([01]{3})101([01]{24})([01]{27})([01]{31})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "comppartref",
            "kind": "int",
            "min": "0",
            "max": "99999999"
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "2147483647"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "comppartref",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00111100([01]{3})110([01]{20})([01]{31})([01]{31})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "comppartref",
            "kind": "int",
            "min": "0",
            "max": "999999999"
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "2147483647"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "comppartref",
          "'/8011/'",
          "cpiserial"
        ]
      }
    ],
    "extract": [],
    "format": []
  },
  {
    "name": "CPI-var",
    "header": "00111101",
    "optionIsGcpLength": true,
    "options": [
      {
        "key": "12",
        "pattern": "^00111101([01]{3})000([01]{40})((?:(?!000000)[01]{6})+)000000([01]{40})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999999",
            "length": 12
          },
          {
            "name": "comppartref",
            "kind": "chars",
            "chars": 6
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "999999999999"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "urlEncodedCompPartRef",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "11",
        "pattern": "^00111101([01]{3})001([01]{37})((?:(?!000000)[01]{6})+)000000([01]{40})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999999",
            "length": 11
          },
          {
            "name": "comppartref",
            "kind": "chars",
            "chars": 6
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "999999999999"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "urlEncodedCompPartRef",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "10",
        "pattern": "^00111101([01]{3})010([01]{34})((?:(?!000000)[01]{6})+)000000([01]{40})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999999",
            "length": 10
          },
          {
            "name": "comppartref",
            "kind": "chars",
            "chars": 6
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "999999999999"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "urlEncodedCompPartRef",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "9",
        "pattern": "^00111101([01]{3})011([01]{30})((?:(?!000000)[01]{6})+)000000([01]{40})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999999",
            "length": 9
          },
          {
            "name": "comppartref",
            "kind": "chars",
            "chars": 6
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "999999999999"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "urlEncodedCompPartRef",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "8",
        "pattern": "^00111101([01]{3})100([01]{27})((?:(?!000000)[01]{6})+)000000([01]{40})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "99999999",
            "length": 8
          },
          {
            "name": "comppartref",
            "kind": "chars",
            "chars": 6
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "999999999999"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "urlEncodedCompPartRef",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "7",
        "pattern": "^00111101([01]{3})101([01]{24})((?:(?!000000)[01]{6})+)000000([01]{40})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "9999999",
            "length": 7
          },
          {
            "name": "comppartref",
            "kind": "chars",
            "chars": 6
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "999999999999"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "urlEncodedCompPartRef",
          "'/8011/'",
          "cpiserial"
        ]
      },
      {
        "key": "6",
        "pattern": "^00111101([01]{3})110([01]{20})((?:(?!000000)[01]{6})+)000000([01]{40})",
        "fields": [
          {
            "name": "filter",
            "kind": "int",
            "min": "0",
            "max": "7",
            "length": 1
          },
          {
            "name": "gs1companyprefix",
            "kind": "int",
            "min": "0",
            "max": "999999",
            "length": 6
          },
          {
            "name": "comppartref",
            "kind": "chars",
            "chars": 6
          },
          {
            "name": "cpiserial",
            "kind": "int",
            "min": "0",
            "max": "999999999999"
          }
        ],
        "grammar": [
          "'/8010/'",
          "gs1companyprefix",
          "urlEncodedCompPartRef",
          "'/8011/'",
          "cpiserial"
        ]
      }
    ],
    "extract": [],
    "format": [
      {
        "out": "urlEncodedCompPartRef",
        "fn": "URLENCODE",
        "args": [
          "comppartref"
        ]
      }
    ]
  }
];

/** Headers of EPC schemes with no GS1 Digital Link form. */
export const OTHER_EPC_HEADERS: Readonly<Record<string, string>> = {
  "00110101": "GID-96",
  "00111011": "ADI-var",
  "00101111": "USDOD-96"
};

/** TDT Table F: how each AI's value is encoded in TDS 2.x "+" schemes. */
export const TABLE_F: Readonly<Record<string, readonly TableFComponent[]>> = {
  "10": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "11": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "12": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "13": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "15": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "16": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "17": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "20": [
    {
      "method": "14.5.2",
      "chars": 2,
      "bits": 7
    }
  ],
  "21": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "22": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "30": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 8
    }
  ],
  "37": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 8
    }
  ],
  "90": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "91": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "92": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "93": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "94": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "95": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "96": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "97": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "98": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "99": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "235": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 28
    }
  ],
  "240": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "241": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "242": [
    {
      "method": "14.5.13",
      "lenBits": 3,
      "max": 6
    }
  ],
  "243": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "250": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "251": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "253": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 17
    }
  ],
  "254": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "255": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 12
    }
  ],
  "400": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "401": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "402": [
    {
      "method": "14.5.2",
      "chars": 17,
      "bits": 57
    }
  ],
  "403": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "410": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "411": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "412": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "413": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "414": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "415": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "416": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "417": [
    {
      "method": "14.5.4",
      "chars": 13,
      "bits": 52
    }
  ],
  "420": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "421": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 4,
      "max": 9
    }
  ],
  "422": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    }
  ],
  "423": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "424": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    }
  ],
  "425": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "426": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    }
  ],
  "427": [
    {
      "method": "14.5.6",
      "lenBits": 2,
      "max": 3
    }
  ],
  "710": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "711": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "712": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "713": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "714": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "715": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "716": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "3100": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3101": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3102": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3103": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3104": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3105": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3110": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3111": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3112": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3113": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3114": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3115": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3120": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3121": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3122": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3123": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3124": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3125": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3130": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3131": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3132": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3133": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3134": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3135": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3140": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3141": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3142": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3143": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3144": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3145": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3150": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3151": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3152": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3153": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3154": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3155": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3160": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3161": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3162": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3163": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3164": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3165": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3200": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3201": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3202": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3203": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3204": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3205": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3210": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3211": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3212": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3213": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3214": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3215": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3220": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3221": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3222": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3223": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3224": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3225": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3230": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3231": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3232": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3233": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3234": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3235": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3240": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3241": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3242": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3243": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3244": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3245": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3250": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3251": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3252": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3253": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3254": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3255": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3260": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3261": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3262": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3263": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3264": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3265": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3270": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3271": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3272": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3273": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3274": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3275": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3280": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3281": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3282": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3283": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3284": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3285": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3290": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3291": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3292": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3293": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3294": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3295": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3300": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3301": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3302": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3303": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3304": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3305": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3310": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3311": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3312": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3313": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3314": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3315": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3320": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3321": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3322": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3323": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3324": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3325": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3330": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3331": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3332": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3333": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3334": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3335": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3340": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3341": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3342": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3343": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3344": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3345": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3350": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3351": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3352": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3353": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3354": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3355": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3360": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3361": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3362": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3363": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3364": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3365": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3370": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3371": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3372": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3373": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3374": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3375": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3400": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3401": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3402": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3403": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3404": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3405": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3410": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3411": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3412": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3413": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3414": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3415": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3420": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3421": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3422": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3423": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3424": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3425": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3430": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3431": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3432": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3433": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3434": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3435": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3440": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3441": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3442": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3443": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3444": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3445": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3450": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3451": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3452": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3453": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3454": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3455": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3460": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3461": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3462": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3463": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3464": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3465": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3470": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3471": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3472": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3473": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3474": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3475": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3480": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3481": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3482": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3483": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3484": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3485": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3490": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3491": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3492": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3493": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3494": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3495": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3500": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3501": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3502": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3503": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3504": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3505": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3510": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3511": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3512": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3513": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3514": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3515": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3520": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3521": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3522": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3523": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3524": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3525": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3530": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3531": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3532": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3533": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3534": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3535": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3540": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3541": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3542": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3543": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3544": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3545": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3550": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3551": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3552": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3553": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3554": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3555": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3560": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3561": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3562": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3563": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3564": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3565": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3570": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3571": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3572": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3573": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3574": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3575": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3600": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3601": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3602": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3603": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3604": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3605": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3610": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3611": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3612": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3613": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3614": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3615": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3620": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3621": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3622": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3623": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3624": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3625": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3630": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3631": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3632": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3633": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3634": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3635": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3640": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3641": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3642": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3643": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3644": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3645": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3650": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3651": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3652": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3653": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3654": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3655": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3660": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3661": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3662": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3663": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3664": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3665": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3670": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3671": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3672": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3673": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3674": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3675": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3680": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3681": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3682": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3683": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3684": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3685": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3690": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3691": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3692": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3693": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3694": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3695": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3900": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3901": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3902": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3903": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3904": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3905": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3906": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3907": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3908": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3909": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3910": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3911": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3912": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3913": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3914": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3915": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3916": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3917": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3918": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3919": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3920": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3921": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3922": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3923": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3924": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3925": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3926": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3927": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3928": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3929": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3930": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3931": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3932": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3933": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3934": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3935": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3936": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3937": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3938": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3939": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 15
    }
  ],
  "3940": [
    {
      "method": "14.5.2",
      "chars": 4,
      "bits": 14
    }
  ],
  "3941": [
    {
      "method": "14.5.2",
      "chars": 4,
      "bits": 14
    }
  ],
  "3942": [
    {
      "method": "14.5.2",
      "chars": 4,
      "bits": 14
    }
  ],
  "3943": [
    {
      "method": "14.5.2",
      "chars": 4,
      "bits": 14
    }
  ],
  "3950": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3951": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3952": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "3953": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "4300": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 35
    }
  ],
  "4301": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 35
    }
  ],
  "4302": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4303": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4304": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4305": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4306": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4307": [
    {
      "method": "14.5.12",
      "chars": 2,
      "bits": 12
    }
  ],
  "4308": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "4309": [
    {
      "method": "14.5.2",
      "chars": 20,
      "bits": 67
    }
  ],
  "4310": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 35
    }
  ],
  "4311": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 35
    }
  ],
  "4312": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4313": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4314": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4315": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4316": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "4317": [
    {
      "method": "14.5.12",
      "chars": 2,
      "bits": 12
    }
  ],
  "4318": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "4319": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "4320": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 35
    }
  ],
  "4321": [
    {
      "method": "14.5.7",
      "chars": 1,
      "bits": 1
    }
  ],
  "4322": [
    {
      "method": "14.5.7",
      "chars": 1,
      "bits": 1
    }
  ],
  "4323": [
    {
      "method": "14.5.7",
      "chars": 1,
      "bits": 1
    }
  ],
  "4324": [
    {
      "method": "14.5.9",
      "chars": 10,
      "bits": 27
    }
  ],
  "4325": [
    {
      "method": "14.5.9",
      "chars": 10,
      "bits": 27
    }
  ],
  "4326": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "4330": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    },
    {
      "method": "14.5.14",
      "bits": 1,
      "max": 1
    }
  ],
  "4331": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    },
    {
      "method": "14.5.14",
      "bits": 1,
      "max": 1
    }
  ],
  "4332": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    },
    {
      "method": "14.5.14",
      "bits": 1,
      "max": 1
    }
  ],
  "4333": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    },
    {
      "method": "14.5.14",
      "bits": 1,
      "max": 1
    }
  ],
  "7001": [
    {
      "method": "14.5.2",
      "chars": 13,
      "bits": 44
    }
  ],
  "7002": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7003": [
    {
      "method": "14.5.9",
      "chars": 10,
      "bits": 27
    }
  ],
  "7004": [
    {
      "method": "14.5.13",
      "lenBits": 3,
      "max": 4
    }
  ],
  "7005": [
    {
      "method": "14.5.6",
      "lenBits": 4,
      "max": 12
    }
  ],
  "7006": [
    {
      "method": "14.5.8",
      "chars": 6,
      "bits": 16
    }
  ],
  "7007": [
    {
      "method": "14.5.10"
    }
  ],
  "7008": [
    {
      "method": "14.5.6",
      "lenBits": 2,
      "max": 3
    }
  ],
  "7009": [
    {
      "method": "14.5.6",
      "lenBits": 4,
      "max": 10
    }
  ],
  "7010": [
    {
      "method": "14.5.6",
      "lenBits": 2,
      "max": 2
    }
  ],
  "7011": [
    {
      "method": "14.5.11"
    }
  ],
  "7020": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "7021": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "7022": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "7023": [
    {
      "method": "14.5.5",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7030": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7031": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7032": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7033": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7034": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7035": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7036": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7037": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7038": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7039": [
    {
      "method": "14.5.2",
      "chars": 3,
      "bits": 10
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 27
    }
  ],
  "7040": [
    {
      "method": "14.5.6",
      "lenBits": 3,
      "max": 4
    }
  ],
  "7041": [
    {
      "method": "14.5.6",
      "lenBits": 3,
      "max": 4
    }
  ],
  "7230": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7231": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7232": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7233": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7234": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7235": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7236": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7237": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7238": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7239": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 30
    }
  ],
  "7240": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "7241": [
    {
      "method": "14.5.4",
      "chars": 2,
      "bits": 8
    }
  ],
  "7242": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 25
    }
  ],
  "7250": [
    {
      "method": "14.5.2",
      "chars": 8,
      "bits": 27
    }
  ],
  "7251": [
    {
      "method": "14.5.2",
      "chars": 12,
      "bits": 40
    }
  ],
  "7252": [
    {
      "method": "14.5.2",
      "chars": 1,
      "bits": 4
    }
  ],
  "7253": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 40
    }
  ],
  "7254": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 40
    }
  ],
  "7255": [
    {
      "method": "14.5.6",
      "lenBits": 4,
      "max": 10
    }
  ],
  "7256": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "7257": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "7258": [
    {
      "method": "14.5.15",
      "chars": 3,
      "bits": 8
    }
  ],
  "7259": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 40
    }
  ],
  "8001": [
    {
      "method": "14.5.2",
      "chars": 14,
      "bits": 47
    }
  ],
  "8002": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "8003": [
    {
      "method": "14.5.4",
      "chars": 14,
      "bits": 56
    },
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 16
    }
  ],
  "8004": [
    {
      "method": "14.5.5",
      "lenBits": 5,
      "max": 30
    }
  ],
  "8005": [
    {
      "method": "14.5.2",
      "chars": 6,
      "bits": 20
    }
  ],
  "8006": [
    {
      "method": "14.5.4",
      "chars": 18,
      "bits": 72
    }
  ],
  "8007": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 24
    }
  ],
  "8008": [
    {
      "method": "14.5.11"
    }
  ],
  "8009": [
    {
      "method": "14.5.6",
      "lenBits": 6,
      "max": 50
    }
  ],
  "8010": [
    {
      "method": "14.5.5",
      "lenBits": 5,
      "max": 30
    }
  ],
  "8011": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 12
    }
  ],
  "8012": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 20
    }
  ],
  "8013": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 25
    }
  ],
  "8017": [
    {
      "method": "14.5.4",
      "chars": 18,
      "bits": 72
    }
  ],
  "8018": [
    {
      "method": "14.5.4",
      "chars": 18,
      "bits": 72
    }
  ],
  "8019": [
    {
      "method": "14.5.13",
      "lenBits": 4,
      "max": 10
    }
  ],
  "8020": [
    {
      "method": "14.5.6",
      "lenBits": 5,
      "max": 25
    }
  ],
  "8026": [
    {
      "method": "14.5.4",
      "chars": 18,
      "bits": 72
    }
  ],
  "8030": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 90
    }
  ],
  "8110": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "8111": [
    {
      "method": "14.5.2",
      "chars": 4,
      "bits": 14
    }
  ],
  "8112": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "8200": [
    {
      "method": "14.5.6",
      "lenBits": 7,
      "max": 70
    }
  ],
  "00": [
    {
      "method": "14.5.4",
      "chars": 18,
      "bits": 72
    }
  ],
  "01": [
    {
      "method": "14.5.4",
      "chars": 14,
      "bits": 56
    }
  ],
  "02": [
    {
      "method": "14.5.4",
      "chars": 14,
      "bits": 56
    }
  ]
};

/** TDT Table K: number of digits in an AI, from its first two digits. */
export const TABLE_K: Readonly<Record<string, number>> = {
  "10": 2,
  "11": 2,
  "12": 2,
  "13": 2,
  "15": 2,
  "16": 2,
  "17": 2,
  "20": 2,
  "21": 2,
  "22": 2,
  "23": 3,
  "24": 3,
  "25": 3,
  "30": 2,
  "31": 4,
  "32": 4,
  "33": 4,
  "34": 4,
  "35": 4,
  "36": 4,
  "37": 2,
  "39": 4,
  "40": 3,
  "41": 3,
  "42": 3,
  "43": 4,
  "70": 4,
  "71": 3,
  "72": 4,
  "80": 4,
  "81": 4,
  "82": 4,
  "90": 2,
  "91": 2,
  "92": 2,
  "93": 2,
  "94": 2,
  "95": 2,
  "96": 2,
  "97": 2,
  "98": 2,
  "99": 2,
  "00": 2,
  "01": 2,
  "02": 2
};
