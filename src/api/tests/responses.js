export const accountsData = {
  range: "Dashboard!B8:C106",
  majorDimension: "ROWS",
  values: [
    ["Checking", 8950],
    ["Last recorded transaction was over a month ago"],
    ["Emergency Account", 0],
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
