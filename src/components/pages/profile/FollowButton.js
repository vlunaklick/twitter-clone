export default function FollowButton({
  isFollowing,
  handleClick,
  className,
  disabled,
}) {
  const text = isFollowing ? 'Siguiendo' : 'Seguir'

  return (
    <button
      className={
        'group w-28 cursor-pointer rounded-[2rem] border py-2 px-1 text-xs font-medium outline-none transition-colors' +
        (isFollowing
          ? ' w-32 border-gray-800 bg-gray-900 text-white hover:border-red-300 hover:bg-red-300 hover:text-red-900'
          : ' border-black bg-black text-white hover:border-gray-900 hover:bg-gray-900') +
        ' ' +
        className +
        ' ' +
        (disabled ? 'opacity-30 transition-colors' : '')
      }
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={(isFollowing && 'group-hover:hidden') + ' block'}>
        {text}
      </span>
      <span className={'hidden ' + (isFollowing && 'group-hover:block')}>
        Dejar de seguir
      </span>
    </button>
  )
}
