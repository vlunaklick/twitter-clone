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
        'hover:bg-[#2r63eb group w-28 cursor-pointer rounded-[2rem] border py-2 px-1 text-xs  outline-none transition-colors hover:border-[#2r63eb]' +
        (isFollowing
          ? ' w-32 border-[#bbb] bg-black bg-opacity-30 text-white hover:border-red-600 hover:bg-red-600 hover:bg-opacity-30 hover:text-red-500'
          : ' bg-white text-black') +
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
