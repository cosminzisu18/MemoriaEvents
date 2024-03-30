namespace Backend_Memoria.Models
{
    public class Prices
    {
        public int Id { get; set; }
        public string PhotoUrl { get; set; }
        public string TitleService { get; set; }
        public int? OldPrice { get; set; }
        public int? Price { get; set; }
        public int? Hours { get; set; }
        public string AfterPrice { get; set; }
        public int TitleSubtitleId { get; set; }
        public TitleSubtitle TitleSubtitle { get; set; }

        public ICollection<PricesCharacteristics> PricesCharacteristics { get; set; } 
    }
}
