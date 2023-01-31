import Link from 'next/link'

export default function ProfileInformation({
  name,
  userName,
  biography,
  following,
  followers,
}) {
  return (
    <div className="mt-6 flex w-full flex-col gap-2 border-b border-gray-200 p-4 dark:border-gray-800">
      <div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {name}
        </h1>
        <h2 className="text-xs text-gray-600 dark:text-gray-400">
          @{userName}
        </h2>
      </div>
      <p className="text-xs text-gray-900 dark:text-white">{biography}</p>
      <div className="flex gap-2 text-xs">
        <Link
          href={`/profile/${userName}/following`}
          className="text-gray-600 hover:underline dark:text-gray-400"
        >
          <span className="font-semibold text-black dark:text-white">
            {following ? following.length : 0}
          </span>{' '}
          siguiendo
        </Link>
        <Link
          href={`/profile/${userName}/followers`}
          className="text-gray-600 hover:underline dark:text-gray-400"
        >
          <span className="font-semibold text-black dark:text-white">
            {followers ? followers.length : 0}
          </span>{' '}
          seguidores
        </Link>
      </div>
    </div>
  )
}
