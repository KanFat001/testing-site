const defaultLanguage = {
  Login: "Login",
  Signup: "Sign Up",
  Profile: "Profile",
  Dashboard: "Dashboard",
  Personal_Info: "Personal Info",
  Order: "Order",
  Wishlist: "Wishlist",
  Address: "Address",
  Reviews: "Reviews",
  Change_Password: "Change Password",
  Logout: "Logout",
  Create_Account: "Create Account",
  Email_Address: "Email Address",
  Password: "Password",
  Confirm_Password: "Confirm Password",
  First_Name: "First Name",
  Last_Name: "Last Name",
  Your_Dashboard: "Your Dashboard"
};

const languageModel = () => {
  if (typeof window !== "undefined") {
    try {
      // Initialize language if not exists
      if (!localStorage.getItem("language")) {
        localStorage.setItem("language", JSON.stringify(defaultLanguage));
        return defaultLanguage;
      }

      // Try to parse existing language
      try {
        const storedLanguage = localStorage.getItem("language");
        const parsedLanguage = JSON.parse(storedLanguage);
        
        // Validate parsed data
        if (!parsedLanguage || typeof parsedLanguage !== 'object') {
          // Reset to default if invalid
          localStorage.setItem("language", JSON.stringify(defaultLanguage));
          return defaultLanguage;
        }

        // Return merged language (default + stored)
        return { ...defaultLanguage, ...parsedLanguage };
      } catch (parseError) {
        // Reset to default if parse fails
        localStorage.setItem("language", JSON.stringify(defaultLanguage));
        return defaultLanguage;
      }
    } catch (error) {
      console.error("Language model error:", error);
      return defaultLanguage;
    }
  }
  return defaultLanguage;
};

export default languageModel;
