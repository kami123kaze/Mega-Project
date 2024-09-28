import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Create a new user account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            // Automatically log in the user after account creation
            return await this.login({ email, password });
        } catch (error) {
            console.error("AuthService :: createAccount :: error", error);
            throw error; // Propagate error for handling in UI
        }
    }

    // Log in a user with email and password
    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session; // Return session information upon successful login
        } catch (error) {
            console.error("AuthService :: login :: error", error);
            throw error; // Propagate error for handling in UI
        }
    }

    // Get the current authenticated user
    async getCurrentUser() {
        try {
            // Check if the user is authenticated
            const session = await this.account.getSession('current');
            // If authenticated, fetch user details
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error", error);
            return null; // Return null if not authenticated or an error occurred
        }
    }

    // Log out the current user
    async logout() {
        try {
            await this.account.deleteSessions(); // Delete all user sessions
            return true; // Return true on successful logout
        } catch (error) {
            console.error("AuthService :: logout :: error", error);
            return false; // Return false on logout failure
        }
    }

    // Check if the user is authenticated
    async isAuthenticated() {
        try {
            const user = await this.getCurrentUser();
            return user !== null; // Return true if user exists, false otherwise
        } catch (error) {
            console.error("AuthService :: isAuthenticated :: error", error);
            return false; // Return false if there was an error
        }
    }
}

const authService = new AuthService();

export default authService;
