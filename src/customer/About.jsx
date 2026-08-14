export default function About() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-5xl p-5 mx-auto px-6 py-12 space-y-10">

        {/* About GenZ Store */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="bg-white w-[400px] h-96 rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/43/9d/74/439d7468efe3edac2d00e3b7d85fcfd3.jpg"
              alt="GenZ fashion"
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
            />
          </div>

          <div className="flex-1 max-w-xl">
            <h2 className="text-3xl font-semibold leading-snug mb-4 text-purple-500">
              About GenZ Store
            </h2>
            <p className="text-sm text-[#6b5d4f] leading-relaxed">
              GenZ Store is your destination for trendy, affordable, and
              youth‑inspired fashion. We bring together bold streetwear,
              casual essentials, and modern styles that resonate with the
              new generation. Our mission is to make fashion fun,
              expressive, and accessible — helping you create looks that
              truly reflect your individuality.
            </p>
          </div>
        </div>

        {/* Why We Chose to Make It */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">

          {/* Image right */}
          <div className="bg-white w-[450px] h-96 rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/7d/55/c5/7d55c5b53421fc221cdc8eea336539d2.jpg"
              alt="Fashion racks"
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Text left */}
          <div className="flex-1 max-w-xl">
            <h2 className="text-2xl font-semibold mb-4 text-purple-500">
              Why We Chose to Make It
            </h2>
            <p className="text-sm text-[#6b5d4f] leading-relaxed">
              We saw a gap in how fashion connects with the new generation.
              Too many stores rely on outdated styles or complicated
              shopping experiences. GenZ Store was built to bridge that gap
              — making trendy clothing accessible, affordable, and fun for
              everyone. From bold streetwear to everyday essentials, our
              mission is to empower self‑expression through fashion.
            </p>
          </div>
        </div>
      </div>

      {/* image section */}
      <section className="my-10 px-4 max-w-2xl mx-auto">
        <div className="flex flex-col gap-12">

          {/* Lecturer */}
          <div className="flex flex-col gap-2 shadow-lg rounded-2xl">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row w-full sm:h-60">

              {/* Image */}
              <div className="w-full sm:w-60 shrink-0">
                <img src="../images/teacher.png" alt="Mr. Chhim Bunchhun" className="w-full h-60 sm:h-full object-cover"/>
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col justify-center gap-4 flex-1 ml-6">
                <div>
                  <h5 className="font-semibold text-gray-800 text-base mb-1">
                    Mr. Chhim Bunchhun
                  </h5>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: "#EEEDFE", color: "#3C3489" }}
                  >
                    Lecturer
                  </span>
                </div>
                <button className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 stroke-2 stroke-blue-500 flex items-center justify-center text-blue-600 shrink-0 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-4 h-4"
                      fill="purple"
                    >
                      <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
                    </svg>
                  </span>
                  <span className="text-sm">chhim.bunchhun@rupp.edu.kh</span>
                </button>
                <button className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-sky-500 shrink-0 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-5 h-5"
                      fill="purple"
                    >
                      <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                    </svg>
                  </span>
                  <span className="text-sm">Bunchhun Chhim</span>
                </button>
                <button className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-sky-500 shrink-0 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-5 h-5"
                      fill="purple"
                    >
                      <path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z" />
                    </svg>
                  </span>
                  <span className="text-sm">@cbunchhun</span>
                </button>
              </div>
            </div>
          </div>

          {/* Developer */}
          <div className="flex flex-col gap-8 shadow-lg rounded-2xl">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row w-full sm:h-60">

              {/* Text */}
              <div className="p-6 flex flex-col justify-center gap-4 flex-1 ml-6">
                <div>
                  <h5 className="font-semibold text-gray-800 text-base mb-1">
                    An Channsina
                  </h5>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ background: "#EEEDFE", color: "#3C3489" }}
                  >
                    Developer
                  </span>
                </div>
                <button className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 stroke-2 stroke-blue-500 flex items-center justify-center text-blue-600 shrink-0 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-4 h-4"
                      fill="purple"
                    >
                      <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z" />
                    </svg>
                  </span>
                  <span className="text-sm">an.channsina.2824@rupp.edu.kh</span>
                </button>
                <button className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-sky-500 shrink-0 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-5 h-5"
                      fill="purple"
                    >
                      <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                    </svg>
                  </span>
                  <span className="text-sm">Channsina An</span>
                </button>
                <button className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-sky-500 shrink-0 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                      className="w-5 h-5"
                      fill="purple"
                    >
                      <path d="M320 72C183 72 72 183 72 320C72 457 183 568 320 568C457 568 568 457 568 320C568 183 457 72 320 72zM435 240.7C431.3 279.9 415.1 375.1 406.9 419C403.4 437.6 396.6 443.8 390 444.4C375.6 445.7 364.7 434.9 350.7 425.7C328.9 411.4 316.5 402.5 295.4 388.5C270.9 372.4 286.8 363.5 300.7 349C304.4 345.2 367.8 287.5 369 282.3C369.2 281.6 369.3 279.2 367.8 277.9C366.3 276.6 364.2 277.1 362.7 277.4C360.5 277.9 325.6 300.9 258.1 346.5C248.2 353.3 239.2 356.6 231.2 356.4C222.3 356.2 205.3 351.4 192.6 347.3C177.1 342.3 164.7 339.6 165.8 331C166.4 326.5 172.5 322 184.2 317.3C256.5 285.8 304.7 265 328.8 255C397.7 226.4 412 221.4 421.3 221.2C423.4 221.2 427.9 221.7 430.9 224.1C432.9 225.8 434.1 228.2 434.4 230.8C434.9 234 435 237.3 434.8 240.6z" />
                    </svg>
                  </span>
                  <span className="text-sm">@channsina_216</span>
                </button>
              </div>

              {/* Image */}
              <div className="w-full sm:w-60 shrink-0">
                <img
                  src="/images/me.png"
                  alt="An Channsina"
                  className="w-full h-60 sm:h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}