// Importing necessary modules and types from React and other files.
import { createContext, useContext, ReactNode } from "react";
import { AuthServiceProps } from "../../@types/auth-service";
import { useAuthService } from "../../services/AuthServices";

// Creating a React context for the authentication service. The context will have a value 
// that matches the shape of AuthServiceProps or will be null.
const AuthServiceContext = createContext<AuthServiceProps | null>(null);

/**
 * Defines the properties required by AuthServiceProvider.
 * 
 * @property {ReactNode} children - Represents any React elements that might be passed as children
 * to this component.
 */
interface AuthServiceProviderProps {
    children: ReactNode;
}

/**
 * The `AuthServiceProvider` component. This component is intended to wrap parts of the application 
 * that need access to the authentication service context.
 * 
 * @param {ReactNode} children - The child components that will have access to the authentication service context.
 * @returns A context provider that makes the authentication service available to its children.
 */
export function AuthServiceProvider({ children }: AuthServiceProviderProps) {
    // Invoke the custom hook `useAuthService` to get the authentication services.
    // It's assumed that the hook returns an object of services, methods, or values 
    // related to authentication.
    const authServices = useAuthService();

    // Return a context provider with the value set to the authentication services. 
    // Any child component wrapped by this provider can access the provided context.
    return (
        <AuthServiceContext.Provider value={authServices}>
            {children}
        </AuthServiceContext.Provider>
    );
}

/**
 * A custom hook to access the authentication service context.
 * 
 * This hook will throw an error if it's used outside of an `AuthServiceProvider`.
 * 
 * @returns The context value which should match the shape of `AuthServiceProps`.
 */
export function useAuthServiceContext(): AuthServiceProps {
    // Use the `useContext` hook to access the value from `AuthServiceContext`.
    const context = useContext(AuthServiceContext);
    
    // If the context value is null, it implies that this hook is being used outside of the 
    // `AuthServiceProvider`, which is not allowed.
    if (context === null) {
        throw new Error("useAuthServiceContext must be used within an AuthServiceProvider");
    }

    // Return the authentication service context.
    return context;
}
