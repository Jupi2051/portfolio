import validateCustomersPage from "./validate-customers-page";

const testValidation = async () => {
  try {
    const isCustomersPageLoaded = await validateCustomersPage();

    console.info("isCustomersPageLoaded", isCustomersPageLoaded);
  } catch (error) {
    console.error("error", error);
  }
};

testValidation();
