import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "@mui/material";
import Whtweoffer from "@/components/Whtweoffer";
import Contact from "@/components/Contact";
import useUser from "@/stores/userStore";
const Home = () => {
  const {user}=useUser()
  return (
    <>
      <div className="flex justify-center items-center pt-12 w-full flex-wrap">
        <div className="flex justify-center items-center flex-col pt-20">
          <h1 className="text-4xl font-extrabold text-blue-700">
            Note{" "}
            <span className="text-4xl font-extrabold text-blue-500">ly</span>
          </h1>
          <h1 className="text-2xl md:text-4xl text-center font-semibold max-w-2xl  ">
            Think Big, Note Bigger
          </h1>{" "}
          <p className="text-gray-800 md:text-base line-clamp-3 max-md:px-2 text-center max-w-md mt-3">
            Whether you're jotting down quick thoughts or planning big ideas
            with your team, our note-taking app helps you stay organized,
            focused, and in sync. Access your notes anywhere, share with ease,
            and turn clutter into clarity.
          </p>
          <Button variant="contained" href={user?"/dashboard":"/signin"}>Get Started</Button>
        </div>

        <ImageList
          sx={{ width: 500, height: 350, marginTop: "4rem" }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=161&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <Whtweoffer />
      <Contact />
    </>
  );
};

export default Home;

const itemData = [
  {
    img: "/pexels-darlene-alderson-7971230.jpg",
    title: "",
  },
  {
    img: "/pexels-goumbik-317385.jpg",
    title: "",
  },
  {
    img: "/pexels-ketut-subiyanto-4350089.jpg",
    title: "",
  },
  {
    img: "/pexels-yankrukov-7698814.jpg",
    title: "",
  },
  {
    img: "/pexels-divinetechygirl-1181248.jpg",
    title: "",
  },
  {
    img: "/pexels-divinetechygirl-1181681.jpg",
    title: "",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "/pexels-cytonn-955398.jpg",
    title: "",
  },
  {
    img: "/pexels-cottonbro-4065617.jpg",
    title: "",
  },
];
