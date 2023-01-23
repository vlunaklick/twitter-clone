/* eslint-disable @next/next/no-img-element */
import Button from '@/components/app/Button'

export default function BannerAndIcon({
  header,
  avatar,
  name,
  userName,
  user,
  handlePush,
  areYouFollowing,
  handleFollow,
  isButtonDisabled,
}) {
  return (
    <div className="relative flex h-[131px] w-full flex-col items-center justify-center border-y border-slate-200 object-cover dark:border-slate-900">
      <img
        className="h-full w-full object-cover"
        src={
          header ||
          'https://i.pinimg.com/736x/10/82/a1/1082a1628e396e67143a8bbf31513b16.jpg'
        }
        alt={name + ' header'}
      />
      <img
        className="absolute left-4 -bottom-10 aspect-square h-20 w-20 rounded-full border-4 border-white bg-slate-900 object-cover dark:border-slate-900 dark:bg-white"
        src={avatar || 'https://i.pravatar.cc/300'}
        alt={name + ' avatar'}
      />
      {user && user.userName === userName && (
        <Button onClick={handlePush} variant="edit_profile">
          Editar perfil
        </Button>
      )}
      {user && user.userName !== userName && (
        <Button
          onClick={handleFollow}
          variant="edit_profile"
          disabled={isButtonDisabled}
        >
          {areYouFollowing ? 'Siguiendo' : 'Seguir'}
        </Button>
      )}
    </div>
  )
}
