export default function Home() {
  return (
    <div className="w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-1 md:gap-3">
      <img
        src="/codepen-home_logo.png"
        alt="CodePen"
        className="w-40 text-center select-none"
      />
      <small className="text-slate-700">
        by{" "}
        <a href="" target="_blank" className="text-slate-300">
          @Singh
        </a>
      </small>
      <p className="text-gray-500 text-center">
        Online HTML, CSS & JavaScript Code Editor <br /> GO try and share it
        with your mates!
      </p>
    </div>
  );
}
