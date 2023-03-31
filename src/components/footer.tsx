const Footer: React.FC = () => {
  return (
    <>
      <div className="bottom-2 underline bg-yellow-300 text-black flex gap-1 w-full justify-center">
        <a href="https://github.com/lucidmach/envious" target="_blank">
          source code
        </a>
        <p>|</p>
        <a
          target="_blank"
          href="https://lucidmach.notion.site/Environment-Visualisation-Software-for-TurtleBot3-based-Robots-6062216d246843988fec1abf3205e6b4"
        >
          log
        </a>
        <p>|</p>
        <a target="_blank" href="https://lucidmach.tech/">
          contact
        </a>
        <p>|</p>
        <a target="_blank" href="https://www.buymeacoffee.com/lucidmach/">
          sponsor
        </a>
        <p>|</p>
        <a
          href="https://lucidmach.notion.site/Documentation-e2b6b57269374ffc91839d174ffeafc9"
          target="_blank"
        >
          documentation
        </a>
      </div>
    </>
  );
};
export default Footer;
