"use client"
import SelfQRcodeWrapper, { SelfAppBuilder } from '@selfxyz/qrcode';
import { v4 as uuidv4 } from 'uuid';

// Generate a unique user ID
const userId = uuidv4();

// Create a SelfApp instance using the builder pattern
const selfApp = new SelfAppBuilder({
    appName: "CelosIDS",
    scope: "celosids",
    endpoint: "https://celosids.com/api/verify",
    userId,
    // Optional disclosure requirements
    disclosures: {
        // DG1 disclosures
        issuing_state: true,
        name: true,
        nationality: true,
        date_of_birth: true,
        passport_number: true,
        gender: true,
        expiry_date: true,
        // Custom verification rules
        minimumAge: 18,
        excludedCountries: ["IRN", "PRK"],
        ofac: true,
    },
}).build();

function SQRCode() {

    return (
        <SelfQRcodeWrapper
            selfApp={selfApp}
            onSuccess={() => {
                console.log('Verification successful');
                // Perform actions after successful verification
            }}
            darkMode={false} // Optional: set to true for dark mode
            size={300} // Optional: customize QR code size (default: 300)
        />
    );
}


export default SQRCode;