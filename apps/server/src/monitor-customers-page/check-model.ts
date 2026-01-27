import validatePageSnapshot from "./validate-customers-page";

const checkModel = async () => {
  const isCustomersPageLoaded = await validatePageSnapshot();
  if (isCustomersPageLoaded) return;
};

export default checkModel;
