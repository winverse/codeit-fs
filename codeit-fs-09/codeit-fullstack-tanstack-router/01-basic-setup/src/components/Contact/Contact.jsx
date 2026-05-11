export function Contact() {
  return (
    <div className="page-content">
      <h1>Contact Us</h1>
      <p>Get in touch with us using the form below.</p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          alert('Thank you for your message! (This is just a demo)');
        }}
      >
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn">
          Send Message
        </button>
      </form>
    </div>
  );
}
