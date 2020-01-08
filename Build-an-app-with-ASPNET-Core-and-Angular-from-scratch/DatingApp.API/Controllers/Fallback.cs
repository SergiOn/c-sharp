using System.IO;
using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers {

    public class Fallback : Controller {

        public IActionResult Index() {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), MediaTypeNames.Text.Html);
        }

    }

}
