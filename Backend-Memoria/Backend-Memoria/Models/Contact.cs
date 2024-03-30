using System.Text.Json.Serialization;
namespace Backend_Memoria.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public int Number { get; set; }
        public string Email { get; set; }
        public int TitleSubtitleId { get; set; }
        public TitleSubtitle TitleSubtitle { get; set; }
        public int SocialMediaId { get; set; }

        public SocialMedia SocialMedia { get; set; }
    }
}
