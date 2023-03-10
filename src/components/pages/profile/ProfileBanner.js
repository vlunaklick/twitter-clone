/* eslint-disable @next/next/no-img-element */
import Button from '@/components/app/Button'
import FollowButton from '../FollowButton'

export default function ProfileBanner({
  header,
  avatar,
  name,
  userName,
  user,
  handleEditProfile,
  areYouFollowing,
  handleFollow,
  isButtonDisabled,
}) {
  return (
    <div className="relative flex h-[131px] w-full flex-col items-center justify-center border-y border-gray-200 object-cover dark:border-gray-900">
      <img
        className="h-full w-full object-cover"
        src={
          header ||
          'https://i.pinimg.com/736x/10/82/a1/1082a1628e396e67143a8bbf31513b16.jpg'
        }
        alt={name + ' header'}
      />
      <img
        className="absolute left-4 -bottom-10 aspect-square h-20 w-20 rounded-full border-4 border-white bg-gray-900 object-cover dark:border-gray-900 dark:bg-white"
        src={avatar || 'https://i.pravatar.cc/300'}
        alt={name + ' avatar'}
      />
      {user && user.userName === userName && (
        <Button onClick={handleEditProfile} variant="edit_profile">
          Editar perfil
        </Button>
      )}
      {user && user.userName !== userName && (
        <FollowButton
          isFollowing={areYouFollowing}
          handleClick={handleFollow}
          disabled={isButtonDisabled}
          className={'absolute right-4 -bottom-10'}
        />
      )}
    </div>
  )
}
