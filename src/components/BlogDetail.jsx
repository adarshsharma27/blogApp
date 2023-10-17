import React from "react";

const BlogDetail = () => {
  return (
    <>
      <section className="text-gray-600 font-montserrat dark:bg-slate-700">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          <img
            className="lg:w-5/6 md:w-full w-full  mb-10 object-cover object-center rounded"
            alt="hero"
            src="https://blog.logrocket.com/wp-content/uploads/2023/10/validating-structural-data-valibot-nocdn.png"
          />
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="font-montserrat sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Knausgaard typewriter readymade marfa
            </h1>
            <p className="mb-8 leading-relaxed">
              Kickstarter biodiesel roof party wayfarers cold-pressed. Palo
              santo live-edge tumeric scenester copper mug flexitarian. Prism
              vice offal plaid everyday carry. Gluten-free chia VHS squid
              listicle artisan.
            </p>

            <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
              Neutra shabby chic ramps, viral fixie.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetail;
