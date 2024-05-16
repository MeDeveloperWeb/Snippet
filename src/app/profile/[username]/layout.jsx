import Image from 'next/image';
import coverImage from '@/assets/cover.jpeg';

export default function Layout({ params, children }) {
  const { username } = params;

  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 grid-rows-4 h-[30vh] lg:h-[40vh]">
        <div
          className="row-start-1 row-span-3 col-start-1 col-span-full border-solid border-0 border-current border-b-2"
          style={{
            backgroundImage: `url(${coverImage.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPositionX: 'center'
          }}
        ></div>
        <Image
          src={`https://api.multiavatar.com/${username}.svg`}
          alt={`${username}'s profile`}
          width={140}
          height={140}
          className="border-solid border-2 rounded-full mx-4 md:ml-12 row-start-3 row-span-2 col-start-1 self-center justify-self-end"
        />
        <h1 className="row-start-3 col-start-2 col-span-full self-end text-white text-4xl font-outline font-black">
          {username}
        </h1>
      </div>
      {children}
    </section>
  );
}
