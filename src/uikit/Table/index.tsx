import { ArchiveIcon, ArrowDownIcon } from '@heroicons/react/outline'
import { RefreshIcon } from '@heroicons/react/solid'
import * as React from 'react'

type TableColumn<Entry extends Record<string, React.ReactNode>> = {
  title: string
  field: string
  Cell?({ entry }: { entry: Entry }): React.ReactElement
}

export type TableProps<Entry extends Record<string, React.ReactNode>> = {
  data: Entry[]
  columns: TableColumn<Entry>[]
  loadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
  isUpdating?: boolean
}

export const Table = <Entry extends { id: string } & Record<string, React.ReactNode>>({
  data,
  columns,
  isUpdating,
  loadMore,
  hasMore,
  isLoading,
}: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <div className="w-full rounded-sm bg-white bg-opacity-10 text-gray-500 h-80 flex justify-center items-center flex-col">
        {isLoading ? (
          <>
            <RefreshIcon className="ml-1 w-10 h-10 animate-spin" />
            <h4 className="mt-4 text-xl">Searching</h4>
          </>
        ) : (
          <>
            <ArchiveIcon className="h-16 w-16" />
            <h4>No Entries Found</h4>
          </>
        )}
      </div>
    )
  }
  return (
    <div className="w-full max-w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.title + index} scope="col" className={`${index === 0 ? 'text-left' : 'text-center'}`}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((entry, entryIndex) => (
            <tr key={entry?.id || entryIndex}>
              {columns.map(({ Cell, field, title }, columnIndex) => {
                if (columnIndex === 0) {
                  return (
                    <th key={title + columnIndex} className="text-left">
                      {Cell ? <Cell entry={entry} /> : entry[field]}
                    </th>
                  )
                }
                return (
                  <td key={title + columnIndex} className="text-center">
                    {Cell ? <Cell entry={entry} /> : entry[field]}
                  </td>
                )
              })}
            </tr>
          ))}
          {loadMore && hasMore && !isLoading && (
            <tr key="loadMore">
              <th colSpan={columns.length} className="w-full">
                <div className="w-full flex justify-center">
                  <span className="flex cursor-pointer" onClick={loadMore}>
                    LOAD MORE <ArrowDownIcon className="ml-1 w-5 h-5" />
                  </span>
                </div>
              </th>
            </tr>
          )}
          {data.length > 0 && isLoading && !isUpdating && (
            <tr key="loadingMore">
              <th colSpan={columns.length} className="w-full">
                <div className="w-full flex justify-center">
                  <span className="flex cursor-pointer" onClick={loadMore}>
                    LOADING MORE <RefreshIcon className="ml-1 w-5 h-5 animate-spin" />
                  </span>
                </div>
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
