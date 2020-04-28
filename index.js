
class AttributeRewriter {
  constructor(attributeName) {
    this.attributeName = attributeName
  }
 
  element(element) {
    const attribute = element.getAttribute(this.attributeName)
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        attribute.replace('https://cloudflare.com', 'https://www.linkedin.com/in/advaitkishwar/.com')
      )
    }
    if(this.attributeName == 'href'){
      element.setInnerContent('Click here to learn more')
    }
    if(this.attributeName == 'p'){
      element.setInnerContent('This is a link to Advaits LinkedIn')
    }
    if(this.attributeName == 'title'){
      element.setInnerContent('Advait Ishwar')
    }
    if(this.attributeName == 'h1'){
      element.after('Advaits Cloudflare Project')
    }
  }

}
const rewriter = new HTMLRewriter()
  .on('a', new AttributeRewriter('href'))
  .on('p', new AttributeRewriter('p'))
  .on('title', new AttributeRewriter('title'))
  .on('h1', new AttributeRewriter('h1'));

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  .then(response => response.json())
  .then(data => {
    return data["variants"];    
  });
  let index = Math.round(Math.random());
  let oldresponse = await fetch(response[index]);
  return rewriter.transform(oldresponse)
}
