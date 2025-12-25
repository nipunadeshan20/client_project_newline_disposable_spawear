export default function AboutUs() {
  return (
    <section 
      id="about" 
      className="w-full bg-white py-40 px-6 md:px-12 scroll-margin-top-navbar"
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Logo */}
        <figure className="flex justify-center md:justify-start animate-fade-left">
          <img 
            src="/BusinessCard.png" 
            alt="New Line Business Card - Premium Disposable Spa Wear Supplier in Sri Lanka"
            className="w-80 md:w-120 object-contain"
            loading="lazy"
            itemProp="image"
          />
        </figure>

        {/* Text Content */}
        <article>
          <h2 
            id="about-heading"
            className="text-3xl md:text-4xl text-center md:text-left font-bold text-gray-900 mb-4 animate-fade-right"
            itemProp="name"
          >
            <span className="text-[#643F18]">Who</span> we are
           </h2>

          <p 
            className="text-gray-600 text-base md:text-lg leading-relaxed text-center md:text-left animate-fade-right"
            itemProp="description"
          >
            We are committed to delivering high-quality products designed with 
            comfort, durability, and purpose in mind. Our mission is to help 
            businesses and individuals find reliable, thoughtfully crafted 
            solutions that support their everyday needs.
          </p>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-4 text-center md:text-left animate-fade-right">
            With a focus on innovation and customer satisfaction, we continuously 
            strive to improve our offerings and create value for everyone who uses 
            our products.
          </p>
        </article>

      </div>
    </section>
  );
}
