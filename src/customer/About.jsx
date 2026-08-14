const team = [
  {
    name: "Mr. Chhim Bunchhun",
    role: "Lecturer",
    email: "chhim.bunchhun@rupp.edu.kh",
    social: "@cbunchhun",
    image: "/team/teacher.png",
  },
  {
    name: "An Channsina",
    role: "Developer",
    email: "an.channsina.2824@rupp.edu.kh",
    social: "@channsina_216",
    image: "/team/me.png",
  },
];

export default function About() {
  return (
    <div>
      <div className="container-page py-14">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden aspect-[4/3]">
            <img src="https://i.pinimg.com/736x/43/9d/74/439d7468efe3edac2d00e3b7d85fcfd3.jpg" alt="GenZ fashion" className="w-full h-full object-cover"/>
          </div>
          <div>
            <h1 className="font-display font-800 text-3xl mb-4">
              About GenZ Store
            </h1>
            <p className="text-black/60 leading-relaxed">
              GenZ Store is your destination for trendy, affordable, and
              youth-inspired fashion. We bring together bold streetwear, casual
              essentials, and modern styles that resonate with the new
              generation. Our mission is to make fashion fun, expressive, and
              accessible — helping you create looks that truly reflect your
              individuality.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-10 items-center mt-20">
          <div className="order-2 md:order-1">
            <h2 className="font-display font-800 text-3xl mb-4">
              Why We Chose to Make It
            </h2>
            <p className="text-black/60 leading-relaxed">
              We saw a gap in how fashion connects with the new generation. Too
              many stores rely on outdated styles or complicated shopping
              experiences. GenZ Store was built to bridge that gap — making
              trendy clothing accessible, affordable, and fun for everyone. From
              bold streetwear to everyday essentials, our mission is to empower
              self-expression through fashion.
            </p>
          </div>
          <div className="order-1 md:order-2 rounded-3xl overflow-hidden aspect-[4/3]">
            <img src="https://i.pinimg.com/736x/7d/55/c5/7d55c5b53421fc221cdc8eea336539d2.jpg" alt="Fashion racks" className="w-full h-full object-cover"/>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display font-700 text-2xl mb-8 text-center">
            Meet the Team
          </h2>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-black/10 p-6 text-center"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-black/5 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <h3 className="font-display font-700 text-lg">{member.name}</h3>
                <p className="text-sm text-black/50">{member.role}</p>
                <p className="text-sm text-black/60 mt-2">{member.email}</p>
                <p className="text-sm text-black/60">{member.social}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
