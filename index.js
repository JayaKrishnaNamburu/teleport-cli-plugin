const computeDependencies = (ImportMapContent) => {
    try {
      const ImportMap = JSON.parse(ImportMapContent)
      return Object.keys(ImportMap.importmap.imports).reduce(
        (acc, importedPackage) => {
          const version = ImportMap.importmap.imports[importedPackage].match(
            /@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*)/gm
          )?.[0]
          if (version) {
            acc[importedPackage] = version
          }
          return acc
        },
        {}
      )
    } catch (error) {
      return {}
    }
  }


class CustomProjectTemplate {
    async runBefore(params) {
      return {
          projectPlugins []
       }
    }
  
    async runAfter(params) {
        const importMap = params.folder.files.find((file) => file.name === 'teleport.config' && file.fileType === 'json')
        const packageJSON = params.folder.files.find((file) => file.name === 'package' && file.fileType === 'json')
        const newPackageJSON = {
            ...JSON.parse(packageJSON.content),
            dependencies: computeDependencies(importMap.content)
        }
        
        params.folder.files = [
            {
                name: 'package',
                fileType: 'json',
                content: JSON.stringify(newPackageJSON, null, 2),
                contentEncoding: 'utf-8'
            }
        ]
        
      return params
    }
}
const customProjectTemplate = new CustomProjectTemplate()
