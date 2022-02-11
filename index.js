class CustomProjectTemplate {
  async runBefore(params) {
    return {
      projectPlugins: []
    }
  }

  async runAfter(params) {
    params.folder.files = []
    params.folder.files.push({
      name: 'testing',
      fileType: 'json',
      content: JSON.stringify({ name: 'Teleport config testing' }, null, 2),
    })
    return params
  }
}

const customProjectTemplate = new CustomProjectTemplate()
module.exports = customProjectTemplate
