import validateCustomersPage from './validate-customers-page'

const testValidation = async () => {
  try {
    const isCustomersPageLoaded = await validateCustomersPage({
      scroll: { y: 0, x: 0 }
    })

    console.info('isCustomersPageLoaded', isCustomersPageLoaded)
  } catch (error) {
    console.error('error', error)
  }
}

testValidation()
