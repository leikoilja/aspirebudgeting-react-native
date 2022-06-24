export const accountsData = {
  range: "Dashboard!B8:C106",
  majorDimension: "ROWS",
  values: [
    ["Checking", 8950],
    ["Last recorded transaction was over a month ago"],
    ["Emergency Account", 12700],
    ["No recorded transactions"],
    ["Stash Account", 10000],
    ["Last recorded transaction was over a month ago"],
    ["CreditCard", 0],
    ["No recorded transactions"],
  ],
};

export const userProfile = {
  resourceName: "people/109188559980025981111",
  etag: "%EgcBAgkuNz0+GgQBAgUHIgxUWmNVREJ12345z0=",
  names: [
    {
      metadata: {
        primary: true,
        source: {
          type: "PROFILE",
          id: "109188559980025981111",
        },
        sourcePrimary: true,
      },
      displayName: "Melvin Testerson",
      familyName: "Testerson",
      givenName: "Melvin",
      displayNameLastFirst: "Testerson, Melvin",
      unstructuredName: "Melvin Testerson",
    },
  ],
  emailAddresses: [
    {
      metadata: {
        primary: true,
        verified: true,
        source: {
          type: "ACCOUNT",
          id: "109188559980025981111",
        },
        sourcePrimary: true,
      },
      value: "test@example.com",
    },
  ],
};

export const availableSheets = {
  kind: "drive#fileList",
  incompleteSearch: false,
  files: [
    {
      kind: "drive#file",
      id: "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_1234",
      name: "test_file_1",
      mimeType: "application/vnd.google-apps.spreadsheet",
    },
    {
      kind: "drive#file",
      id: "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_5678",
      name: "test_file_2",
      mimeType: "application/vnd.google-apps.spreadsheet",
    },
    {
      kind: "drive#file",
      id: "1kzH6JdkFtuS-Iy3CnaAxfaYnzJ7pwydu0nwhV3_9012",
      name: "test_file_3",
      mimeType: "application/vnd.google-apps.spreadsheet",
    },
  ],
};
