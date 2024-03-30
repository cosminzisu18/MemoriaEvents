namespace Backend_Memoria.Models
{
    public class About
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Text1 { get; set; }
        public string Text2 { get; set; }
        public string ImageUrl { get; set; }

        public List<AboutQuality> AboutQualities { get; set; }

    }
}
