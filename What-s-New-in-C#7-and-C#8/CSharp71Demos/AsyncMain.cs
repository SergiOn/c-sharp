using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace CSharp71Demos {

    internal class AsyncMain {

        // used to be the case that your demo
        // would have to reside in a separate
        // body

        private static string url = "http://google.com/robots.txt";

        //private static async Task MainAsync(string s)
        //{
        //  // blah
        //  Console.WriteLine(await new HttpClient().GetStringAsync(s));
        //}

        //public static void Main(string[] args)
        //{
        //  // fine
        //  MainAsync(url).GetAwaiter().GetResult();
        //}

    
        // there is no async void, it's

        // Task Main
        // Task<int> Main if you need to return
        static async Task Main(string[] args) {
            Console.WriteLine(await new HttpClient().GetStringAsync(url));
        }

    }

}
