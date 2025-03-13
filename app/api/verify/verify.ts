import { SelfBackendVerifier } from '@selfxyz/core';
import { countryCodes } from '@selfxyz/core';


const selfBackendVerifier = new SelfBackendVerifier(
    "https://forno.celo.org", // Celo RPC url, we recommend using Forno
    "celosids2" // the scope that you chose to identify your app
);

selfBackendVerifier.setMinimumAge(21);
selfBackendVerifier.enablePassportNoOfacCheck();
selfBackendVerifier.enableNameAndYobOfacCheck();
selfBackendVerifier.excludeCountries(
    countryCodes.IRN,
    countryCodes.PRK,
    countryCodes.SYR
);