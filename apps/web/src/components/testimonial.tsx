"use client";

import { useRef } from "react";

import Image from "next/image";

import { TimelineContent } from "@/components/ui/timeline-animation";

function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };
  const cardBase =
    "group relative flex flex-col justify-between overflow-hidden rounded-lg border border-dashed border-zinc-800 transition-colors";

  return (
    <section
      ref={testimonialRef}
      className="relative container mx-auto h-full py-14"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-poppins mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Trusted By Engineers
          <br />
          <span className="text-zinc-600">Showcase your real skills</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="flex w-full flex-col gap-2 px-4 pt-10 pb-4 lg:grid lg:grid-cols-3 lg:px-10 lg:py-10">
        {/* Column 1 */}
        <div className="flex h-full flex-col gap-2 lg:gap-0 lg:space-y-2">
          <TimelineContent
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            className={`bg-primaryColor flex-6 p-5 lg:flex-7 ${cardBase}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-size-[50px_56px]" />
            <article className="mt-auto">
              <p>
                &quot;For the first time, my skills were judged by my code — not
                just my resume. The AI insights felt accurate and
                motivating.&quot;
              </p>

              <div className="flex justify-between pt-5">
                <div>
                  <h2 className="text-sm font-semibold lg:text-xl">
                    DEV HARI OJHA
                  </h2>
                  <p>FULL STACK ENGINEER</p>
                </div>

                <Image
                  src="https://avatars.githubusercontent.com/u/155317634?v=4"
                  alt="DEV HARI OJHA"
                  width={64}
                  height={64}
                  className="rounded-xl object-cover"
                />
              </div>
            </article>
          </TimelineContent>

          <TimelineContent
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            className={`bg-primaryColor flex-4 p-5 text-white lg:h-fit lg:flex-3 lg:shrink-0 ${cardBase}`}
          >
            <article className="mt-auto">
              <p>
                &quot;The developer score helped me understand where I stand and
                how to improve.&quot;
              </p>

              <div className="flex justify-between pt-5">
                <div>
                  <h2 className="text-xl font-semibold">ARPIT YADAV</h2>
                  <p>SOFTWARE ENGINEER</p>
                </div>

                <Image
                  src="https://avatars.githubusercontent.com/u/118053362?v=4"
                  alt="ARPIT YADAV"
                  width={64}
                  height={64}
                  className="rounded-xl object-cover"
                />
              </div>
            </article>
          </TimelineContent>
        </div>

        {/* Column 2 */}
        <div className="flex h-fit flex-col gap-2 lg:h-full lg:gap-0 lg:space-y-2">
          {[
            {
              name: "ANIKET NISHAD",
              profession: "",
              img: "https://pro-section.ui-layouts.com/people/aam4.jpg",
              text: "I loved how transparent the evaluation was. I could see exactly why I got my score and what to work on next.",
            },
            {
              name: "NISHANT DIXIT",
              profession: "",
              img: "https://avatars.githubusercontent.com/u/145234347?v=4",
              text: "Thanks to HireXAI, recruiters reached out to me directly based on my real abilities, not keywords.",
            },
            {
              name: "PRABHAT YADAV",
              profession: "",
              img: "https://pro-section.ui-layouts.com/people/aam3.jpg",
              text: "The platform turned my GitHub work into real opportunities.",
            },
          ].map((item, i) => (
            <TimelineContent
              key={item.name}
              animationNum={i + 2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className={`bg-black p-5 text-white ${cardBase}`}
            >
              <article className="mt-auto">
                <p className="text-sm 2xl:text-base">&quot;{item.text}&quot;</p>

                <div className="flex items-end justify-between pt-5">
                  <div>
                    <h2 className="text-lg font-semibold lg:text-xl">
                      {item.name}
                    </h2>
                    <p className="text-sm lg:text-base">
                      Developer {item.profession}
                    </p>
                  </div>

                  <Image
                    src={item.img}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-12 w-12 rounded-xl object-cover lg:h-16 lg:w-16"
                  />
                </div>
              </article>
            </TimelineContent>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex h-full flex-col gap-2 lg:gap-0 lg:space-y-2">
          <TimelineContent
            animationNum={5}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            className={`flex-4 bg-transparent p-5 text-white lg:flex-3 ${cardBase}`}
          >
            <article className="mt-auto">
              <p>
                &quot;My GitHub finally mattered. HireXAI turned real projects
                into a meaningful developer profile.&quot;
              </p>

              <div className="flex justify-between pt-5">
                <div>
                  <h2 className="text-xl font-semibold">PALLAV RAI</h2>
                  <p>BACKEND DEVELOPER</p>
                </div>

                <Image
                  src="https://avatars.githubusercontent.com/u/33592027?v=4"
                  alt="PALLAV RAI"
                  width={64}
                  height={64}
                  className="rounded-xl object-cover"
                />
              </div>
            </article>
          </TimelineContent>

          <TimelineContent
            animationNum={6}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
            className={`bg-primaryColor flex-6 p-5 lg:flex-7 ${cardBase}`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-size-[50px_56px]" />
            <article className="mt-auto">
              <p>
                &quot;The AI feedback pushed me to write cleaner, more
                maintainable code.&quot;
              </p>

              <div className="flex justify-between pt-5">
                <div>
                  <h2 className="text-xl font-semibold">PANKAJ KANNOUJIA</h2>
                  <p>AI DEVELOPER</p>
                </div>

                <Image
                  src="https://pro-section.ui-layouts.com/people/in1.jpg"
                  alt="PANKAJ KANNOUJIA"
                  width={64}
                  height={64}
                  className="rounded-xl object-cover"
                />
              </div>
            </article>
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}

export default ClientFeedback;
