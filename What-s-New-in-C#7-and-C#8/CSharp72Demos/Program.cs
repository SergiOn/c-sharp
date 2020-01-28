using System;

namespace CSharp72Demos {

    // PrivateProtected
    class Foo : Base {
        public Foo() {
            // cannot access from other project: private protected
            // in this case it's a the same project: protected
            // in another project: private
            this.c = 10;
        }
    }

    class Program {

        static void Main(string[] args) {
            // Console.WriteLine("Hello World!");
            
            // LeadingUnderscoresNumericSeparators.MainLUNS(args);
            
            // Derived d = new Derived();
            // PrivateProtected.MainPP(args);

            NonTrailingNamedArguments.MainNTNA(args);

        }

    }

}
