import { UserIcon } from 'lucide-react';

export default function Header({ doctorName }) {
  // const [doctor, setDoctor] = useState(null);

  // useEffect(() => {
  //   const fetchDoctor = async () => {
  //     try {
  //       const res = await axios.get('/api/user'); // Replace with your actual endpoint
  //       setDoctor(res.data);
  //     } catch (error) {
  //       console.error("Error fetching doctor data:", error);
  //     }
  //   };

  //   fetchDoctor();
  // }, []);
  return (
    <header className="flex justify-end items-center bg-white p-4 shadow-md">
      <div className="flex items-center">
        <div className="rounded-full mr-3"><UserIcon/></div>
        <span className="font-medium mr-1">{doctorName}</span>
      </div>
    </header>
  );
}