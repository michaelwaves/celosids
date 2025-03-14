import { getUserIdentifier, SelfBackendVerifier, countryCodes } from '@selfxyz/core';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(req.body)
    console.log(data)
    console.log(req.body)
    if (req.method === 'POST') {
        try {
            const { proof, publicSignals } = data;

            if (!proof || !publicSignals) {
                return NextResponse.json({ message: 'Proof and publicSignals are required' }, { status: 400 });
            }

            // Extract user ID from the proof
            const userId = await getUserIdentifier(publicSignals);
            console.log("Extracted userId:", userId);

            // Initialize and configure the verifier
            const selfBackendVerifier = new SelfBackendVerifier(
                'https://forno.celo.org',
                'celosids'
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

            console.log(result)

            if (result.isValid) {
                // Return successful verification response
                return NextResponse.json({
                    status: 'success',
                    result: true,
                    credentialSubject: result.credentialSubject
                }, { status: 200 });

            } else {
                // Return failed verification response
                return NextResponse.json({
                    status: 'success',
                    result: false,
                    message: 'Verification failed',
                    details: result.isValidDetails
                }, { status: 400 });
            }
        } catch (error) {
            console.error('Error verifying proof:', error);
            return NextResponse.json({
                status: 'error',
                result: false,
                message: error instanceof Error ? error.message : 'Unknown error'
            }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }
}

