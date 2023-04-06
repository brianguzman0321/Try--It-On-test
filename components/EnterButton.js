import Link from 'next/link';

const EnterButton = () => {
  return (
    <Link href="/gallery" className="bg-blue-500 text-white py-2 px-4 rounded">
      Enter site
    </Link>
  );
};

export default EnterButton;
