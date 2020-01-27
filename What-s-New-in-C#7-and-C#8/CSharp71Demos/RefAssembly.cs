using System;

namespace CSharp71Demos {

    public class RefAssembly {

        private int id;
        // protected string Name { get; set; };
        protected string Name { get; set; } = "My Name";

        public void SayHello() => Console.WriteLine($"Hi, I'm {Name}");

        public static void MainRA(string[] args) {
            new RefAssembly().SayHello();
        }

    }

}
