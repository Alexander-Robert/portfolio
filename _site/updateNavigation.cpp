// updateNavigation when run will edit navigation.html to include all different content files
// content files for this static webpage project are all "name".md files
#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>
#include <regex>
using namespace std;
namespace fs = std::filesystem;

bool search_directory(string &, string, vector<fs::path> &);

string edit_file = "navigation.yml";
int main()
{
    string path = fs::current_path().string();
    vector<fs::path> names;
    string nav_path, text;

    if(search_directory(nav_path, path, names)) {
        cout << "nav: " << nav_path << endl; 
        fstream navigation(nav_path);

        navigation.clear();
        navigation << "<nav>\n";
        navigation << "    <a href=\"/\">Home</a>\n";
        for (const auto & element : names) {
            string filename = element.filename().string();
            string name = filename.substr(0, filename.size()-3);
            string capitalizedName = char(toupper(name[0])) + name.substr(1,name.size()-1);
            // string search = "title: ";
            // ifstream content(element);
            // if(content.is_open()) {
            //     while (getline(content, text)) {
            //         if(text.find(search)) {
            //             cout << "FOUND TITLE" << endl;
            //             cout << text << endl; 
            //             //text is displaying --- which either means the first line is true (AKA .find(search) is the issue)
            //             //                       or that getline is going to the next line after finding the search string

            //             //capitalizedName = text.substr(search.size()-1, text.size()-1);
            //             //string temp = text;
            //             //cout << temp.substr(search.size()-1) << endl;
            //             //cout << "capitalizedName " << capitalizedName << endl;
            //             break;
            //         }
            //     }
            // }
            // content.close();
            navigation << "    <a href=\"/" << name << ".html\">" << capitalizedName << "</a>\n";
        }
        navigation << "</nav>\n";
        navigation.close();
    }
    
    return 0;
}

//I couldn't figure out how to make a fs::recursive_directory_iterator highlight normal files
//So I made a function that does it and returns if it correctly finds the navigation file
bool search_directory(string & nav_path, string path, vector<fs::path> & names) {
    for(const auto & entry : fs::directory_iterator(path)) {
        if(entry.is_directory()) {
            //ignore these subdirectories
            if(entry.path().filename() == "_site" 
            || entry.path().filename() == ".jekyll-cache")
                continue;
            
            //recurse through subdirectories
            search_directory(nav_path, entry.path().string(), names);
            continue;
        }
        string filename = entry.path().filename().string();
        //find the navigation file we want to update
        if (filename == edit_file && nav_path.empty()) {
            nav_path = entry.path().string();
        }

        //look for the content files distingished by the file extension .md
        else if(filename.substr(filename.length() - 3) == ".md") {
            names.push_back(entry.path());
        }
    }
    return !nav_path.empty();
}