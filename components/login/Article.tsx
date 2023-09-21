import Image from "next/image";
interface ArticleProps {
  content: string;
  title: string;
  subtitle: string;
  imgPath: string;
}
const Article = ({ content, title, subtitle, imgPath }: ArticleProps) => {
  return (
    <article className="w-full lg:max-w-[400px] border shadow-md rounded-2xl mb-3 mr-2 bg-white  z-30   px-2 xl:px-4 py-1 xl:py-3  ">
      <h6 className="text-center mb-1 font-bold mt-2  text-lime-600">
        {title}
      </h6>
      <div className="flex flex-col xl:flex-row   justify-items-center gap-2 items-center">
        <div className=" ">
          <Image src={imgPath} height={750} alt="mision" priority />
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-sky-400">{subtitle}</h4>
          <p className="text-justify text-sm text-indigo-800">{content}</p>
        </div>
      </div>
    </article>
  );
};

export default Article;
