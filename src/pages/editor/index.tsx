import classNames from 'classnames'
import React from 'react'
import { useInnerSize } from '../../hooks'

const Editor: React.FC = () => {
  const { width, height } = useInnerSize()

  return (
    <div className="p-4 relative flex flex-col" style={{ width, height }}>
      <textarea className={classNames(
        'resize-none',
        'w-full',
        'h-full',
        'bg-gray-100',
        'dark:bg-gray-600',
        'outline-none',
        'px-4',
        'py-2',
        'max-w-lg',
        'm-auto',
        'mb-12',
      )} />
      <footer className={classNames(
        'absolute',
        'bottom-0',
        'left-0',
        'w-full',
        'py-2',
        'px-4',
        'flex',
        'flex-row-reverse',
        'bg-white',
        'flex',
        'border-t',
        'dark:bg-black',
      )}>
        <button className={classNames(
          'rounded-md',
          'bg-purple-500',
          'px-4',
          'py-1',
          'text-white',
          'active:bg-purple-700',
          'outline-none',
        )}>Save</button>
      </footer>
    </div>
  )
}

export default Editor
