namespace Backend_Memoria.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Left { get; set; }
        public int Top { get; set; }
        public string CardFrontUrl { get; set; }
        public string CardBackUrl { get; set; }
        public int TitleSubtitleId { get; set; }
        public TitleSubtitle TitleSubtitle { get; set; }
    }
}
