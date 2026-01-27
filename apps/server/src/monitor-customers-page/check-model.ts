import validatePageSnapshot from './validate-customers-page'

const checkModel = async () => {
  const isCustomersPageLoaded = await validatePageSnapshot({
    scroll: { y: 0, x: 0 }
  })
  if (isCustomersPageLoaded) return
}

export default checkModel
