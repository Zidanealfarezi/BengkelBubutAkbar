$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class ImageP {
    public static void CC(string s, string d) {
        try {
            using (Image i = Image.FromFile(s)) {
                int sz = Math.Min(i.Width, i.Height);
                int fg = 256;
                using (Bitmap b = new Bitmap(fg, fg)) {
                    using (Graphics g = Graphics.FromImage(b)) {
                        g.SmoothingMode = SmoothingMode.AntiAlias;
                        g.Clear(Color.Transparent);
                        GraphicsPath p = new GraphicsPath();
                        p.AddEllipse(0, 0, fg, fg);
                        g.SetClip(p);
                        g.DrawImage(i, new Rectangle(0, 0, fg, fg), new Rectangle((i.Width-sz)/2, (i.Height-sz)/2, sz, sz), GraphicsUnit.Pixel);
                    }
                    b.Save(d, ImageFormat.Png);
                }
            }
        } catch (Exception ex) {
            Console.WriteLine(ex.Message);
        }
    }
}
"@
Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
[ImageP]::CC("d:\Project\landing-page\bengkelbubutakbar\logo.png", "d:\Project\landing-page\bengkelbubutakbar\logo_circle.png")
