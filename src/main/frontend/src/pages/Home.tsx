import { Loading } from '@geist-ui/react'
import React from 'react'
import { useHash } from 'react-use'
import FilesTable from '../components/FileTable'
import { usePathQuery } from '../utils/path'
import UploadFile from '../components/UploadFile'
import CreateDirectory from '../components/CreateDirectory'

const Home = () => {
  const [hash, setHash] = useHash()
  const [path, setPath] = React.useState<string>(
    hash ? hash.substring(1) : '/'
  )

  const { files, error, isLoading, isError, isSuccess } =
    usePathQuery(path)

  const updatePath = (path: string) => (
    setPath(path), setHash(`#${path}`)
  )

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl">我的文件</h1>
        <div className="space-x-4">
          <UploadFile />
          <CreateDirectory />
        </div>
      </div>
      <FilesTable data={files} updatePath={updatePath} />
      {isLoading ? <Loading className="!mt-12" /> : null}
      {isError ? (
        <div className="mt-4 text-sm text-red-600">
          {(error as any).message}
        </div>
      ) : null}
    </div>
  )
}

export default Home
