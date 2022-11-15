import { FC, memo, useCallback } from 'react'

interface PaginationProps {
  currentPage: number
  totalPage: number
  onChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = memo(({ currentPage, totalPage, onChange }) => {
  const enterPrePage = useCallback(() => {
    onChange(Math.max(currentPage, 1))
  }, [currentPage, onChange])

  const enterNextPage = useCallback(() => {
    onChange(Math.min(currentPage, totalPage))
  }, [currentPage, onChange, totalPage])
  return (
    <div className="btn-group">
      {currentPage > 1 && totalPage > 5 && (
        <button className="btn" onClick={enterPrePage}>
          «
        </button>
      )}
      {currentPage > 2 && <button className="btn">1</button>}
      {currentPage > 3 && <button className="btn btn-disabled">...</button>}

      {currentPage > 1 && (
        <button className="btn" onClick={enterPrePage}>
          {currentPage - 1}
        </button>
      )}
      <button className="btn btn-active">{currentPage}</button>
      {currentPage < totalPage && (
        <button className="btn" onClick={enterNextPage}>
          {currentPage + 1}
        </button>
      )}
      {currentPage < totalPage - 1 && <button className="btn btn-disabled">...</button>}
      {currentPage < totalPage && <button className="btn">{totalPage}</button>}
      {currentPage < totalPage && totalPage > 5 && (
        <button className="btn" onClick={enterNextPage}>
          »
        </button>
      )}
    </div>
  )
})
