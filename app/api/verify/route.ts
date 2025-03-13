import { getUserIdentifier, SelfBackendVerifier, countryCodes } from '@selfxyz/core';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    if (req.method === 'POST') {
        try {
            const { proof, publicSignals } = data.body;

            if (!proof || !publicSignals) {
                return NextResponse.json({ status: 400, message: 'Proof and publicSignals are required' });
            }

            // Extract user ID from the proof
            const userId = await getUserIdentifier(publicSignals);
            console.log("Extracted userId:", userId);

            // Initialize and configure the verifier
            const selfBackendVerifier = new SelfBackendVerifier(
                'https://forno.celo.org',
                'celosids2'
            );

            // Configure verification options
            selfBackendVerifier.setMinimumAge(18);
            selfBackendVerifier.excludeCountries(
                countryCodes.IRN,   // Iran
                countryCodes.PRK    // North Korea
            );
            selfBackendVerifier.enableNameAndDobOfacCheck();

            // Verify the proof
            const result = await selfBackendVerifier.verify(proof, publicSignals);

            if (result.isValid) {
                // Return successful verification response
                return NextResponse.json({
                    status: 200,
                    result: true,
                    credentialSubject: result.credentialSubject
                });

            } else {
                // Return failed verification response
                return NextResponse.json({
                    status: 500,
                    result: false,
                    message: 'Verification failed',
                    details: result.isValidDetails
                });
            }
        } catch (error) {
            console.error('Error verifying proof:', error);
            return NextResponse.json({
                status: 500,
                result: false,
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    } else {
        return NextResponse.json({ status: 405, message: 'Method not allowed' });
    }
}

